#include <Adafruit_GFX.h>
#include <RGBmatrixPanel.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiServer.h>
#include <WiFiUdp.h>

int status = WL_IDLE_STATUS;
char ssid[] = "mynetwork";
char pass[] = "mypassword";
int keyIndex = 0;

char server[] = "multilife.live";

WiFiClient client;

// If your 32x32 matrix has the SINGLE HEADER input,
// use this pinout:
#define CLK 8  // MUST be on PORTB! (Use pin 11 on Mega)
#define OE  9
#define LAT 10
#define A   A0
#define B   A1
#define C   A2
#define D   A3
// If your matrix has the DOUBLE HEADER input, use:
//#define CLK 8  // MUST be on PORTB! (Use pin 11 on Mega)
//#define LAT 9
//#define OE  10
//#define A   A3
//#define B   A2
//#define C   A1
//#define D   A0
RGBmatrixPanel matrix(A, B, C, D, CLK, LAT, OE, false);

#define UPDATE 1
#define SET_CELL 2
#define PLAYER_COUNT 5
#define DRAW_CELLS 6

typedef struct {
  uint8_t x;
  uint8_t y;
} Point;

typedef struct {
  uint32_t r;
  uint32_t g;
  uint32_t b;
} Color;

typedef struct {
  Point point;
  Color color;
} Cell;

void setup() {

  if (WiFi.status() == WL_NO_SHIELD) {
    while (true);
  }

  while (status != WL_CONNECTED) {
    status = WiFi.begin(ssid, pass);
    delay(10000);
  }

  client.connect(server, 31337);

  matrix.begin();
}

void loop() {
  while (client.available()) {
    uint8_t type = client.read();
    uint16_t len16;
    uint8_t len8;
    switch (type) {
      case UPDATE:
        len16 = readShort();
        matrix.fillScreen(0);
        for (uint16_t i = 0; i < len16; ++i) {
          Cell cell = readCell();
          renderCell(cell);
        }
        break;
      case SET_CELL:
        uint8_t alive = client.read();
        Cell cell = readCell();
        if (alive) {
          renderCell(cell);
        } else {
          matrix.drawPixel(cell.point.x, cell.point.y, 0);
        }
        break;
      case PLAYER_COUNT:
        if (readInt() == 0) {
          matrix.fillScreen(0);
        }
        break;
      case DRAW_CELLS:
        uint8_t len8 = client.read();
        Color color = readColor();
        for (uint8_t i = 0; i < len8; ++i) {
          Cell cell;
          cell.point = readPoint();
          cell.color = color;
          renderCell(cell);
        }
        break;
      
    }
  }
  if (!client.connected()) {
    client.stop();
  }
}

uint16_t readShort() {
  uint8_t val = client.read();
  val <<= 8;
  val |= client.read();
  return val;
}

uint32_t readInt() {
  uint32_t val = client.read();
  val <<= 24;
  val |= client.read();
  val <<= 16;
  val |= client.read();
  val <<= 8;
  val |= client.read();
  return val;
}

Point readPoint() {
  Point point;
  point.x = client.read();
  point.y = client.read();
  return point;
}

Cell readCell() {
  Cell cell;
  cell.point = readPoint();
  cell.color = readColor();
  return cell;
}

Color readColor() {
  Color color;
  color.r = readInt();
  color.g = readInt();
  color.b = readInt();
  return color;
}

void renderCell(Cell cell) {
  matrix.drawPixel(
    cell.point.x,
    cell.point.y, 
    matrix.Color888(cell.color.r, cell.color.g, cell.color.b));
}
