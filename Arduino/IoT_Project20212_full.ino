#include <ArduinoJson.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

// Pins of devices
#define MQ2         34
#define DHTPIN      5
#define BUZZER      23
#define LEDR        27
#define LEDG        26
#define LEDB        25
#define BUTTONPIN   2
#define LEDPIN      21
#define LEDDUTY     32

// RGB channels
#define R_CHANNEL   0
#define G_CHANNEL   1
#define B_CHANNEL   2

// Light intensity channel
#define LED_CHANNEL 3

// DHT type
#define DHTTYPE     DHT11

// ID of devices
#define TEMP_ID     "62cf9d5113ae1b0adf7d315c"
#define LIGHT_ID    "62d7cf1c183313692da06c11"
#define HUMID_ID    "62bd09aa3e5f8e5cc2c584af"
#define GAS_ID      "62c5b71e8b3f52c4d5dabb34"
#define BUZZER_ID   "62d7d0a6183313692da06d0b"
#define RGB_ID      "62bd097e3e5f8e5cc2c5849b"
#define DUTY_ID     "62d7cf26183313692da06c1c"

// Wifi Info
const char* ssid = "iPhone của Macbook";
const char* password = "Nghia121200";

// MQTT Broker
const char* mqttServer = "broker.hivemq.com";

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);
DHT dht(DHTPIN, DHTTYPE);

int buttonState = 0;
int lastButtonState = 0;
bool isLightOn = false;
int sensorValue = 0;
long lastMsg = 0;

void setup() {
  Serial.begin(9600);
  setup_wifi();
  mqttClient.setServer(mqttServer, 1883);
  mqttClient.setCallback(subscribeReceive);

  pinMode(LEDPIN, OUTPUT);
  ledcSetup(LED_CHANNEL, 5000, 13);
  ledcAttachPin(LEDDUTY, LED_CHANNEL);
  ledcAttachPin(LEDR, R_CHANNEL);
  ledcAttachPin(LEDG, G_CHANNEL);
  ledcAttachPin(LEDB, B_CHANNEL);

  ledcSetup(R_CHANNEL, 5000, 8);
  ledcSetup(G_CHANNEL, 5000, 8);
  ledcSetup(B_CHANNEL, 5000, 8);

  pinMode(BUTTONPIN, INPUT);
  pinMode(MQ2, INPUT);
  pinMode(BUZZER, OUTPUT);
  
  dht.begin();
}

void loop() {
  if (!mqttClient.connected()) {
    setup_mqtt();
  }

  mqttClient.loop();
  handleLightButton();

  // Get temperatue, humidity, gas value every 10 seconds
  long now = millis();
  if (now - lastMsg > 10000) {
    lastMsg = now;
    getDHTData();
    getGasData();
  }
}

void setup_wifi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.print("Connected to Wifi: ");
  Serial.print(WiFi.localIP());
  Serial.println();
}

void setup_mqtt() {
  if (mqttClient.connect("control")) {
    Serial.println("Connected to MQTT");
    mqttClient.subscribe("/control_IOT");
    mqttClient.setCallback(subscribeReceive);
  } else {
    Serial.println("MQTT connection failed.");
  }
}

// Handle JSON payload sent from subscribed topic
void subscribeReceive(char* topic, byte* payload, unsigned int length) {
  Serial.print("Topic: ");
  Serial.print(topic);
  char str[length + 1];

  Serial.print("\nMessage arrived: ");

  int i = 0;
  for (i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    str[i] = (char)payload[i];
  }
  str[i] = 0; // Null termination

  Serial.println();

  StaticJsonDocument <256> doc;
  deserializeJson(doc, payload);

  const char* deviceID = doc["deviceId"];

  if (strcmp(deviceID, LIGHT_ID) == 0) {
    bool lightStatus = doc["control"]["status"];
    Serial.println(lightStatus);
    handleLight(lightStatus);
  }
  else if (strcmp(deviceID, BUZZER_ID) == 0) {
    bool buzzerStatus = doc["control"]["control"]["status"];
    handleBuzzer(buzzerStatus);
  }
  else if (strcmp(deviceID, RGB_ID) == 0) {
    const char* mode = doc["control"]["mode"];
    int intensity = doc["control"]["intensity"];
    bool rgbStatus = doc["control"]["status"];

    if (!rgbStatus) {
      RGB_Color(0, 0, 0);
    } else {
      if (intensity == 1) {
        RGB_Handle(mode); 
      }
      else if (intensity == 2) {
        for (int i = 0; i < 4; i++) {
          RGB_Color(0, 0, 0);
          delay(500);
          RGB_Handle(mode);
          delay(500);
        }
      }
      else if (intensity == 3) {
        int cnt = 800;
        for (int i = 0; i < 3; i++) {
          RGB_Color(255, 0, 0);
          delay(cnt);
          RGB_Color(255, 127, 0);
          delay(cnt);
          RGB_Color(255, 255, 0);
          delay(cnt);
          RGB_Color(0, 255, 0);
          delay(cnt);
          RGB_Color(0, 0, 255);
          delay(cnt);
          RGB_Color(75, 0, 130);
          delay(cnt);
          RGB_Color(48, 0, 211);
          delay(cnt);
          RGB_Color(0, 0, 0);
          delay(500);
          RGB_Handle(mode);
          cnt /= 2;
        }
      }
    }
  }
  else if (strcmp(deviceID, DUTY_ID) == 0) {
    bool dutyStatus = doc["control"]["status"];
    int speed = doc["control"]["speed"];

    if (!dutyStatus)
      pwm_set_duty(0);
    else
      pwm_set_duty(speed);
  }
}

void getDHTData() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  } else {
    float hif = dht.computeHeatIndex(f, h);
    float hic = dht.computeHeatIndex(t, h, false);

    Serial.print(F("Humidity: "));
    Serial.print(h);
    Serial.print(F("%  Temperature: "));
    Serial.print(t);
    Serial.print(F("°C "));
    Serial.print(f);
    Serial.print(F("°F  Heat index: "));
    Serial.print(hic);
    Serial.print(F("°C "));
    Serial.print(hif);
    Serial.println(F("°F"));

    String temperature = String(t);
    String humidity = String(h);

    StaticJsonDocument<256> doc, doc1;
    doc["deviceId"] = TEMP_ID;
    doc["value"] = temperature;
    doc1["deviceId"] = HUMID_ID;
    doc1["value"] = humidity;

    publishToMQTT(doc);
    publishToMQTT(doc1);
  }
}

void getGasData() {
  sensorValue = analogRead(MQ2);
  String gasValue = String(sensorValue);
  Serial.print("Gas value: ");
  Serial.print(sensorValue);
  Serial.println();

  StaticJsonDocument<256> doc;
  doc["deviceId"] = GAS_ID;
  doc["value"] = gasValue;

  publishToMQTT(doc);

  if (sensorValue > 1000) {
    Serial.print("HIGH GAS INTENSITY!!!!\n");
    digitalWrite(BUZZER, HIGH);

    StaticJsonDocument<256> doc;
    doc["deviceId"] = BUZZER_ID;
    doc["control"]["state"] = true;

    //publishToMQTT(doc);
//      char out[128];
//    serializeJson(doc, out);
//    mqttClient.publish("/control_IOT", out);
  }
}

void handleLight(bool lightStatus) {
  if (lightStatus) {
    turnLightOn();
  }
  else {
    turnLightOff();
  }
}

void handleLightButton() {
  buttonState = digitalRead(BUTTONPIN);

  if (buttonState != lastButtonState) {
    if (buttonState == HIGH) {
      if (isLightOn) {
        turnLightOff();
      } else {
        turnLightOn();
      }
    }

    // Delay to avoid button bouncing
    delay(100);
  }

  lastButtonState = buttonState;
}

void handleBuzzer(bool buzzerStatus) {
  if (!buzzerStatus) {
    digitalWrite(BUZZER, LOW);

    StaticJsonDocument<256> doc;
    doc["deviceId"] = BUZZER_ID;
    doc["control"]["status"] = false;

    publishToMQTT(doc);
  }
}

void turnLightOn() {
  digitalWrite(LEDPIN, HIGH);
  isLightOn = true;

  StaticJsonDocument<256> doc;
  doc["deviceId"] = LIGHT_ID;
  doc["control"]["status"] = true;

  publishToMQTT(doc);
}

void turnLightOff() {
  digitalWrite(LEDPIN, LOW);
  isLightOn = false;

  StaticJsonDocument<256> doc;
  doc["deviceId"] = LIGHT_ID;
  doc["control"]["status"] = false;

  publishToMQTT(doc);
}

static long map(int x, int in_min, int in_max, int out_min, long out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void pwm_set_duty(int duty)
{
  int new_duty = map(duty, 0, 100, 0, 8192);
  ledcWrite(LED_CHANNEL, duty);
}

void RGB_Color(int r, int g, int b)
{
  ledcWrite(R_CHANNEL, r);
  ledcWrite(G_CHANNEL, g);
  ledcWrite(B_CHANNEL, b);
}

void RGB_Handle(const char* rgb)
{
  char val[3] = {0, 0, 0};
  int r, g, b;
  char* s;
  val[0] = *(rgb + 1);
  val[1] = *(rgb + 2);
  r = strtol(val, &s, 16);

  val[0] = *(rgb + 3);
  val[1] = *(rgb + 4);
  g = strtol(val, &s, 16);

  val[0] = *(rgb + 5);
  val[1] = *(rgb + 6);
  b = strtol(val, &s, 16);

  printf("red = %d, green = %d, blue = %d", r, g, b);
  RGB_Color(r, g, b);
}

void publishToMQTT(StaticJsonDocument<256> doc) {
  char out[128];
  serializeJson(doc, out);
  mqttClient.publish("datatest1", out);
}
