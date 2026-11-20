window.API_LIBRARY = {
  "eis": {
    "meta": {
      "title": "Sciospec COMInterface",
      "manual": "ISX-3 / ISX-3mini",
      "revision": 123,
      "release": "2026-11-11",
      "commandCount": 29,
      "operationCount": 98,
      "exampleCount": 108
    },
    "commands": {
      "18": {
        "code": "0x18",
        "name": "Acknowledgements / system messages",
        "group": "Protocol",
        "description": "Device-to-host status frames. These are received messages, not requests.",
        "source": "Manual v123 · pp. 102–103",
        "options": [
          {
            "code": "status",
            "title": "Status code",
            "request": "Device → host: 18 01 [status] 18",
            "response": "No host ACK response specified",
            "fields": [
              [
                "status",
                "1",
                "uint8",
                "—",
                "01=frame error; 02=timeout; 04=boot ready; 11=TCP connected/watchdog; 81=not executed; 82=unknown command; 83=executed; 84=system ready; 90=overcurrent; 91=overvoltage",
                "—"
              ]
            ],
            "notes": "Route status frames separately from measurement data.",
            "examples": [
              {
                "title": "Command executed",
                "hex": "18 01 83 18",
                "why": "Received from device. Do not send this as a configuration command."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 102,
        "pageEnd": 103
      },
      "90": {
        "code": "0x90",
        "name": "Save settings",
        "group": "System",
        "description": "Persist supported settings into flash. Only while no measurement is running.",
        "source": "Manual v123 · p. 104",
        "options": [
          {
            "code": "save",
            "title": "Save settings",
            "request": "90 00 90",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Save while the instrument is idle. This command stores NTC parameters and Sync Time in flash. Use it to retain changes to Ethernet settings.",
            "examples": [
              {
                "title": "Persist supported settings",
                "hex": "90 00 90",
                "why": "Wait for acknowledgement before starting a measurement or restarting the device."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 104,
        "pageEnd": 104
      },
      "97": {
        "code": "0x97",
        "name": "Set output options",
        "group": "Measurement",
        "description": "Enable timestamps or current-range fields in measurement data. Configure while idle.",
        "source": "Manual v123 · pp. 104–106",
        "options": [
          {
            "code": "01",
            "title": "timestamp ms",
            "request": "97 02 01 [enable] 97",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "0"
              ]
            ],
            "notes": "Temporary; reset on restart. ms and µs timestamps are mutually exclusive; last configuration wins.",
            "examples": [
              {
                "title": "Enable timestamp ms",
                "hex": "97 02 01 01 97",
                "why": "Changes the B8 data frame layout; await ACK before starting."
              }
            ],
            "help": [
              "stream"
            ]
          },
          {
            "code": "02",
            "title": "timestamp µs",
            "request": "97 02 02 [enable] 97",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "0"
              ]
            ],
            "notes": "Temporary; reset on restart. ms and µs timestamps are mutually exclusive; last configuration wins.",
            "examples": [
              {
                "title": "Enable timestamp µs",
                "hex": "97 02 02 01 97",
                "why": "Changes the B8 data frame layout; await ACK before starting."
              }
            ],
            "help": [
              "stream"
            ]
          },
          {
            "code": "04",
            "title": "current-range output",
            "request": "97 02 04 [enable] 97",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "0"
              ]
            ],
            "notes": "Temporary; reset on restart. ms and µs timestamps are mutually exclusive; last configuration wins.",
            "examples": [
              {
                "title": "Enable current-range output",
                "hex": "97 02 04 01 97",
                "why": "Changes the B8 data frame layout; await ACK before starting."
              }
            ],
            "help": [
              "stream"
            ]
          }
        ],
        "notes": "",
        "pageStart": 104,
        "pageEnd": 106
      },
      "98": {
        "code": "0x98",
        "name": "Get options / frequency limits",
        "group": "Measurement",
        "description": "Read active output options or query the connected device frequency limits.",
        "source": "Manual v123 · pp. 106–107",
        "options": [
          {
            "code": "01",
            "title": "Timestamp state (ms query)",
            "request": "98 01 01 98",
            "response": "98 02 01 [timestamp] 98; then ACK: 18 01 83 18",
            "fields": [
              [
                "timestamp (response)",
                "1",
                "uint8",
                "—",
                "0=off; 1=ms; 2=µs",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read timestamp state",
                "hex": "98 01 01 98",
                "why": "Response reports the configured timestamp mode, followed by ACK."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Timestamp state (µs query)",
            "request": "98 01 02 98",
            "response": "98 02 02 [timestamp] 98; then ACK: 18 01 83 18",
            "fields": [
              [
                "timestamp (response)",
                "1",
                "uint8",
                "—",
                "0=off; 1=ms; 2=µs",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read timestamp state",
                "hex": "98 01 02 98",
                "why": "Readback; default mode is disabled."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Frequency limits",
            "request": "98 01 03 98",
            "response": "98 09 03 [MinF:4] [MaxF:4] 98; then ACK: 18 01 83 18",
            "fields": [
              [
                "MinF (response)",
                "4",
                "float32",
                "Hz",
                "Device-dependent minimum",
                "—"
              ],
              [
                "MaxF (response)",
                "4",
                "float32",
                "Hz",
                "Device-dependent maximum",
                "—"
              ]
            ],
            "notes": "Decode the two big-endian float32 values in Hz. Use these bounds when configuring AC frequencies. For DC resistance, set frequency to 0 Hz with B6/02.",
            "examples": [
              {
                "title": "Query supported frequency range",
                "hex": "98 01 03 98",
                "why": "The nine-byte payload contains the option byte followed by the minimum and maximum frequencies."
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "Current-range output state",
            "request": "98 01 04 98",
            "response": "98 02 04 [enabled] 98; then ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read range-output flag",
                "hex": "98 01 04 98",
                "why": "The reply reports whether measurement frames contain the current range field."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 106,
        "pageEnd": 107
      },
      "a1": {
        "code": "0xA1",
        "name": "Reset system",
        "group": "System",
        "description": "Restart the complete device.",
        "source": "Manual v123 · pp. 107–108",
        "options": [
          {
            "code": "reset",
            "title": "Reset",
            "request": "A1 00 A1",
            "response": "ACK: 18 01 83 18; boot-ready and system-ready messages",
            "fields": [],
            "notes": "Reset clears temporary output options. Re-establish communication and setup after restart.",
            "examples": [
              {
                "title": "Restart device",
                "hex": "A1 00 A1",
                "why": "Restart command; distinguish ACK, boot-ready (04) and ready (84) status frames."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 107,
        "pageEnd": 108
      },
      "b1": {
        "code": "0xB1",
        "name": "Get frontend settings",
        "group": "EIS",
        "description": "Read channel-stack count or the frontend configuration of a selected channel.",
        "source": "Manual v123 · pp. 111–114",
        "options": [
          {
            "code": "count",
            "title": "Channel count",
            "request": "B1 01 00 B1",
            "response": "B1 02 [count:2] B1; then ACK: 18 01 83 18",
            "fields": [
              [
                "count (response)",
                "2",
                "uint16",
                "channels",
                "Number of stack configurations",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read channel count",
                "hex": "B1 01 00 B1",
                "why": "The special one-byte zero request reads the count."
              }
            ],
            "help": [
              "stack"
            ]
          },
          {
            "code": "channel",
            "title": "Channel configuration",
            "request": "B1 02 [channel:2] B1",
            "response": "B1 [LE] [mode] [current range] [voltage range] [channel settings] B1; then ACK: 18 01 83 18",
            "fields": [
              [
                "channel",
                "2",
                "uint16",
                "index",
                "1-based configured channel index",
                "—"
              ],
              [
                "mode / current range / voltage range",
                "3",
                "3 × uint8",
                "—",
                "Same codes as B0",
                "—"
              ],
              [
                "channel settings",
                "6/9/12",
                "electrode pairs",
                "—",
                "Port:uint8 + extension channel:uint16 per electrode",
                "—"
              ]
            ],
            "notes": "Channel indices start at 1. The response uses the mode, range and electrode routing fields defined in B0.",
            "examples": [
              {
                "title": "Read channel configuration",
                "hex": "B1 02 00 01 B1",
                "why": "Read first configured frontend channel (channel 1)."
              }
            ],
            "help": [
              "stack",
              "range"
            ]
          }
        ],
        "notes": "",
        "pageStart": 111,
        "pageEnd": 114
      },
      "b5": {
        "code": "0xB5",
        "name": "Get extension modules",
        "group": "Hardware",
        "description": "Identify external and internal modules and optional channel counts.",
        "source": "Manual v123 · pp. 115–117",
        "options": [
          {
            "code": "modules",
            "title": "Module discovery",
            "request": "B5 00 B5",
            "response": "B5 [LE] [external] [optional ext count:2] [internal] [optional int count:2] B5; then ACK: 18 01 83 18",
            "fields": [
              [
                "external module",
                "1",
                "uint8",
                "—",
                "00 none; 01 MEArack; 02 MuxModule32; 03 ECIS; 05 ExtensionPortAdapter; 06 SlideChip; 07 Mux32any2any; 08 DaQEisMux; 09 Mux32any2any2202",
                "—"
              ],
              [
                "internal module",
                "1",
                "uint8",
                "—",
                "00 none; 01 Mux16x4; 02 Mux32x2; 07 Mux32any2any; 09 Mux32any2any2202",
                "—"
              ],
              [
                "optional channel count",
                "2",
                "uint16",
                "channels",
                "Follows each nonzero module code; absent for 00",
                "—"
              ]
            ],
            "notes": "Each nonzero external or internal module code is followed by its channel count. A module code of 00 occupies one byte. LE is 02, 04 or 06, depending on the number of installed modules.",
            "examples": [
              {
                "title": "Discover connected modules",
                "hex": "B5 00 B5",
                "why": "Parse module code before deciding whether its channel count is present."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 115,
        "pageEnd": 117
      },
      "b9": {
        "code": "0xB9",
        "name": "Set synchronization time",
        "group": "Measurement",
        "description": "Set the interval between consecutive spectra.",
        "source": "Manual v123 · pp. 133–134",
        "options": [
          {
            "code": "sync",
            "title": "Set Sync Time",
            "request": "B9 04 [time:4] B9",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "time",
                "4",
                "uint32",
                "µs",
                "0–180,000,000 µs (180 s)",
                "0"
              ]
            ],
            "notes": "The interval applies between consecutive spectra, including a switch to another channel. SyncOut is low during the interval. Use 90 to save the setting.",
            "examples": [
              {
                "title": "1 ms between spectra",
                "hex": "B9 04 00 00 03 E8 B9",
                "why": "Wait 1 ms between the last point of one spectrum and the first point of the next."
              }
            ],
            "help": [
              "sync"
            ]
          }
        ],
        "notes": "",
        "pageStart": 133,
        "pageEnd": 134
      },
      "ba": {
        "code": "0xBA",
        "name": "Get synchronization time",
        "group": "Measurement",
        "description": "Read the configured waiting time between spectra.",
        "source": "Manual v123 · pp. 133–134",
        "options": [
          {
            "code": "sync",
            "title": "Read Sync Time",
            "request": "BA 00 BA",
            "response": "BA 04 [time:4] BA; then ACK: 18 01 83 18",
            "fields": [
              [
                "time (response)",
                "4",
                "uint32",
                "µs",
                "0–180,000,000 µs (180 s)",
                "0"
              ]
            ],
            "notes": "The interval applies between consecutive spectra, including a switch to another channel. SyncOut is low during the interval. Use 90 to save the setting.",
            "examples": [
              {
                "title": "Read Sync Time",
                "hex": "BA 00 BA",
                "why": "Decode the four-byte big-endian value in µs."
              }
            ],
            "help": [
              "sync"
            ]
          }
        ],
        "notes": "",
        "pageStart": 133,
        "pageEnd": 134
      },
      "bd": {
        "code": "0xBD",
        "name": "Set Ethernet configuration",
        "group": "Network",
        "description": "Set static IPv4 address or DHCP mode.",
        "source": "Manual v123 · pp. 134–135",
        "options": [
          {
            "code": "01",
            "title": "Static IPv4",
            "request": "BD 05 01 [IPv4:4] BD",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "IPv4",
                "4",
                "4 × uint8",
                "octets",
                "Each 0–255",
                "0.0.0.0"
              ]
            ],
            "notes": "Static address applies only with DHCP disabled. Save settings for persistence; choose an address valid for your network.",
            "examples": [
              {
                "title": "Example static address",
                "hex": "BD 05 01 C0 A8 01 64 BD",
                "why": "Example address: 192.168.1.100. Substitute an available address on your network."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "DHCP mode",
            "request": "BD 02 03 [switch] BD",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "switch",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "1"
              ]
            ],
            "notes": "Reboot required to apply; save for persistence.",
            "examples": [
              {
                "title": "Enable DHCP",
                "hex": "BD 02 03 01 BD",
                "why": "Save the setting and restart the device with A1. Reconnect using the address assigned by your DHCP server."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 134,
        "pageEnd": 135
      },
      "be": {
        "code": "0xBE",
        "name": "Get Ethernet configuration",
        "group": "Network",
        "description": "Read actual IPv4 address, MAC address or DHCP mode.",
        "source": "Manual v123 · pp. 135–136",
        "options": [
          {
            "code": "01",
            "title": "IPv4",
            "request": "BE 01 01 BE",
            "response": "BE 05 01 [IPv4:4] BE; then ACK: 18 01 83 18",
            "fields": [
              [
                "IPv4 (response)",
                "4",
                "4 × uint8",
                "—",
                "Actual allocated address",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read IPv4",
                "hex": "BE 01 01 BE",
                "why": "Data response precedes ACK."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "MAC",
            "request": "BE 01 02 BE",
            "response": "BE 07 02 [MAC:6] BE; then ACK: 18 01 83 18",
            "fields": [
              [
                "MAC (response)",
                "6",
                "6 × uint8",
                "—",
                "Hardware MAC address",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read MAC",
                "hex": "BE 01 02 BE",
                "why": "Data response precedes ACK."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "DHCP",
            "request": "BE 01 03 BE",
            "response": "BE 02 03 [DHCP:1] BE; then ACK: 18 01 83 18",
            "fields": [
              [
                "DHCP (response)",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read DHCP",
                "hex": "BE 01 03 BE",
                "why": "Data response precedes ACK."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 135,
        "pageEnd": 136
      },
      "cf": {
        "code": "0xCF",
        "name": "TCP watchdog",
        "group": "Network",
        "description": "Configure the interval for checking TCP client connectivity.",
        "source": "Manual v123 · pp. 136–137",
        "options": [
          {
            "code": "interval",
            "title": "Watchdog interval",
            "request": "CF 05 00 [seconds:4] CF",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "seconds",
                "4",
                "uint32",
                "s",
                "1–600; step 1",
                "60"
              ]
            ],
            "notes": "The device checks the TCP connection by periodically sending status 11. If the send fails, the device returns its server socket to the listening state.",
            "examples": [
              {
                "title": "60-second watchdog",
                "hex": "CF 05 00 00 00 00 3C CF",
                "why": "Configure the device TCP connection watchdog."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 136,
        "pageEnd": 137
      },
      "d1": {
        "code": "0xD1",
        "name": "Get device ID",
        "group": "System",
        "description": "Read the device type, serial number and delivery date.",
        "source": "Manual v123 · pp. 137–138",
        "options": [
          {
            "code": "id",
            "title": "Read identity",
            "request": "D1 00 D1",
            "response": "D1 [LE] [general information:7] [reserved bytes] D1; then ACK: 18 01 83 18",
            "fields": [
              [
                "format version",
                "1",
                "uint8",
                "—",
                "1",
                "—"
              ],
              [
                "device identifier",
                "2",
                "uint16",
                "—",
                "Device type identifier",
                "—"
              ],
              [
                "serial number",
                "2",
                "uint16",
                "—",
                "Unique serial",
                "—"
              ],
              [
                "delivery year",
                "1",
                "uint8",
                "year",
                "2010 + byte",
                "—"
              ],
              [
                "delivery month",
                "1",
                "uint8",
                "month",
                "1–12",
                "—"
              ],
              [
                "reserved data",
                "variable",
                "reserved",
                "—",
                "Skip these bytes",
                "—"
              ]
            ],
            "notes": "The first seven payload bytes contain the identification fields. Treat any remaining bytes as reserved.",
            "examples": [
              {
                "title": "Identify device",
                "hex": "D1 00 D1",
                "why": "Decode general fields only when the returned format version is recognized."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 137,
        "pageEnd": 138
      },
      "d2": {
        "code": "0xD2",
        "name": "Get FPGA firmware ID",
        "group": "System",
        "description": "Read FPGA firmware revision and build.",
        "source": "Manual v123 · pp. 138–139",
        "options": [
          {
            "code": "id",
            "title": "Read FPGA ID",
            "request": "D2 00 D2",
            "response": "D2 09 [internal:5] [revision:2] [build:2] D2; then ACK: 18 01 83 18",
            "fields": [
              [
                "internal information",
                "5",
                "reserved",
                "—",
                "—",
                "—"
              ],
              [
                "revision",
                "2",
                "uint16",
                "—",
                "—",
                "—"
              ],
              [
                "build",
                "2",
                "uint16",
                "—",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read FPGA version",
                "hex": "D2 00 D2",
                "why": "Ignore reserved developer bytes; decode revision and build as big-endian unsigned integers."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 138,
        "pageEnd": 139
      },
      "99": {
        "code": "0x99",
        "name": "Set IOPort configuration",
        "group": "IO / NTC",
        "description": "Configure eight GPIO directions or output states. Requires supported IOPort hardware.",
        "source": "Manual v123 · pp. 149–150",
        "options": [
          {
            "code": "01",
            "title": "Direction",
            "request": "99 02 01 [vector] 99",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "vector",
                "1",
                "bitmask",
                "—",
                "bit0=IO1 … bit7=IO8; 0=input; 1=output",
                "0"
              ]
            ],
            "notes": "State writes act on outputs; configure direction first.",
            "examples": [
              {
                "title": "Direction for IO1",
                "hex": "99 02 01 01 99",
                "why": "Other bits are 0, so this full-vector write affects all eight GPIOs."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "State",
            "request": "99 02 02 [vector] 99",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "vector",
                "1",
                "bitmask",
                "—",
                "bit0=IO1 … bit7=IO8; 0=low; 1=high",
                "0"
              ]
            ],
            "notes": "State writes act on outputs; configure direction first.",
            "examples": [
              {
                "title": "State for IO1",
                "hex": "99 02 02 01 99",
                "why": "Other bits are 0, so this full-vector write affects all eight GPIOs."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 149,
        "pageEnd": 150
      },
      "9a": {
        "code": "0x9A",
        "name": "Get IOPort configuration",
        "group": "IO / NTC",
        "description": "Read eight GPIO directions or states.",
        "source": "Manual v123 · pp. 150–151",
        "options": [
          {
            "code": "01",
            "title": "Direction",
            "request": "9A 01 01 9A",
            "response": "9A 02 01 [vector] 9A; then ACK: 18 01 83 18",
            "fields": [
              [
                "vector (response)",
                "1",
                "bitmask",
                "—",
                "bit0=IO1 … bit7=IO8; 0=input; 1=output",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read GPIO Direction",
                "hex": "9A 01 01 9A",
                "why": "Decode each bit separately."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "State",
            "request": "9A 01 02 9A",
            "response": "9A 02 02 [vector] 9A; then ACK: 18 01 83 18",
            "fields": [
              [
                "vector (response)",
                "1",
                "bitmask",
                "—",
                "bit0=IO1 … bit7=IO8; 0=low; 1=high",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read GPIO State",
                "hex": "9A 01 02 9A",
                "why": "Decode each bit separately."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 150,
        "pageEnd": 151
      },
      "9b": {
        "code": "0x9B",
        "name": "Set NTC parameters 1",
        "group": "IO / NTC",
        "description": "Configure NTC sensor 1 parameters.",
        "source": "Manual v123 · pp. 151–152",
        "options": [
          {
            "code": "01",
            "title": "Beta",
            "request": "9B 05 01 [value:4] 9B",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "Beta",
                "4",
                "float32",
                "K",
                "Use the value from the sensor datasheet",
                "—"
              ]
            ],
            "notes": "Use the sensor datasheet to obtain the NTC parameters.",
            "examples": [
              {
                "title": "Example: set Beta",
                "hex": "9B 05 01 45 6D 80 00 9B",
                "why": "Set β to 3800 K."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Nominal resistance",
            "request": "9B 05 02 [value:4] 9B",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "Nominal resistance",
                "4",
                "float32",
                "Ω",
                "Use the value from the sensor datasheet",
                "—"
              ]
            ],
            "notes": "Use the sensor datasheet to obtain the NTC parameters.",
            "examples": [
              {
                "title": "Example: set Nominal resistance",
                "hex": "9B 05 02 46 1C 40 00 9B",
                "why": "Set the nominal resistance to 10 kΩ."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Reference temperature",
            "request": "9B 05 03 [value:4] 9B",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "Reference temperature",
                "4",
                "float32",
                "K",
                "Use the value from the sensor datasheet",
                "—"
              ]
            ],
            "notes": "Use the sensor datasheet to obtain the NTC parameters.",
            "examples": [
              {
                "title": "Example: set Reference temperature",
                "hex": "9B 05 03 43 95 13 33 9B",
                "why": "Set the reference temperature to 298.15 K (25 °C)."
              }
            ],
            "help": []
          }
        ],
        "notes": "Requires a supported temperature sensor connection. Use 90 to retain sensor parameters after restart.",
        "pageStart": 151,
        "pageEnd": 152
      },
      "9c": {
        "code": "0x9C",
        "name": "Get NTC parameters 1",
        "group": "IO / NTC",
        "description": "Read NTC sensor 1 parameters and temperature.",
        "source": "Manual v123 · pp. 152–153",
        "options": [
          {
            "code": "01",
            "title": "Beta",
            "request": "9C 01 01 9C",
            "response": "9C 05 01 [value:4] 9C; then ACK: 18 01 83 18",
            "fields": [
              [
                "Beta (response)",
                "4",
                "float32",
                "K",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read Beta",
                "hex": "9C 01 01 9C",
                "why": "Decode float32 in K."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Nominal resistance",
            "request": "9C 01 02 9C",
            "response": "9C 05 02 [value:4] 9C; then ACK: 18 01 83 18",
            "fields": [
              [
                "Nominal resistance (response)",
                "4",
                "float32",
                "Ω",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read Nominal resistance",
                "hex": "9C 01 02 9C",
                "why": "Decode float32 in Ω."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Reference temperature",
            "request": "9C 01 03 9C",
            "response": "9C 05 03 [value:4] 9C; then ACK: 18 01 83 18",
            "fields": [
              [
                "Reference temperature (response)",
                "4",
                "float32",
                "K",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read Reference temperature",
                "hex": "9C 01 03 9C",
                "why": "Decode float32 in K."
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "Current temperature",
            "request": "9C 01 04 9C",
            "response": "9C 05 04 [value:4] 9C; then ACK: 18 01 83 18",
            "fields": [
              [
                "Current temperature (response)",
                "4",
                "float32",
                "°C",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read Current temperature",
                "hex": "9C 01 04 9C",
                "why": "Decode float32 in °C."
              }
            ],
            "help": []
          }
        ],
        "notes": "Requires a supported temperature sensor connection. Use 90 to retain sensor parameters after restart.",
        "pageStart": 152,
        "pageEnd": 153
      },
      "9d": {
        "code": "0x9D",
        "name": "Set NTC parameters 2",
        "group": "IO / NTC",
        "description": "Configure NTC sensor 2 parameters.",
        "source": "Manual v123 · pp. 153–154",
        "options": [
          {
            "code": "01",
            "title": "Beta",
            "request": "9D 05 01 [value:4] 9D",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "Beta",
                "4",
                "float32",
                "K",
                "Use the value from the sensor datasheet",
                "—"
              ]
            ],
            "notes": "Use the sensor datasheet to obtain the NTC parameters.",
            "examples": [
              {
                "title": "Example: set Beta",
                "hex": "9D 05 01 45 6D 80 00 9D",
                "why": "Set β to 3800 K."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Nominal resistance",
            "request": "9D 05 02 [value:4] 9D",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "Nominal resistance",
                "4",
                "float32",
                "Ω",
                "Use the value from the sensor datasheet",
                "—"
              ]
            ],
            "notes": "Use the sensor datasheet to obtain the NTC parameters.",
            "examples": [
              {
                "title": "Example: set Nominal resistance",
                "hex": "9D 05 02 46 1C 40 00 9D",
                "why": "Set the nominal resistance to 10 kΩ."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Reference temperature",
            "request": "9D 05 03 [value:4] 9D",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "Reference temperature",
                "4",
                "float32",
                "K",
                "Use the value from the sensor datasheet",
                "—"
              ]
            ],
            "notes": "Use the sensor datasheet to obtain the NTC parameters.",
            "examples": [
              {
                "title": "Example: set Reference temperature",
                "hex": "9D 05 03 43 95 13 33 9D",
                "why": "Set the reference temperature to 298.15 K (25 °C)."
              }
            ],
            "help": []
          }
        ],
        "notes": "Requires a supported temperature sensor connection. Use 90 to retain sensor parameters after restart.",
        "pageStart": 153,
        "pageEnd": 154
      },
      "9e": {
        "code": "0x9E",
        "name": "Get NTC parameters 2",
        "group": "IO / NTC",
        "description": "Read NTC sensor 2 parameters and temperature.",
        "source": "Manual v123 · pp. 154–155",
        "options": [
          {
            "code": "01",
            "title": "Beta",
            "request": "9E 01 01 9E",
            "response": "9E 05 01 [value:4] 9E; then ACK: 18 01 83 18",
            "fields": [
              [
                "Beta (response)",
                "4",
                "float32",
                "K",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read Beta",
                "hex": "9E 01 01 9E",
                "why": "Decode float32 in K."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Nominal resistance",
            "request": "9E 01 02 9E",
            "response": "9E 05 02 [value:4] 9E; then ACK: 18 01 83 18",
            "fields": [
              [
                "Nominal resistance (response)",
                "4",
                "float32",
                "Ω",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read Nominal resistance",
                "hex": "9E 01 02 9E",
                "why": "Decode float32 in Ω."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Reference temperature",
            "request": "9E 01 03 9E",
            "response": "9E 05 03 [value:4] 9E; then ACK: 18 01 83 18",
            "fields": [
              [
                "Reference temperature (response)",
                "4",
                "float32",
                "K",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read Reference temperature",
                "hex": "9E 01 03 9E",
                "why": "Decode float32 in K."
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "Current temperature",
            "request": "9E 01 04 9E",
            "response": "9E 05 04 [value:4] 9E; then ACK: 18 01 83 18",
            "fields": [
              [
                "Current temperature (response)",
                "4",
                "float32",
                "°C",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read Current temperature",
                "hex": "9E 01 04 9E",
                "why": "Decode float32 in °C."
              }
            ],
            "help": []
          }
        ],
        "notes": "Requires a supported temperature sensor connection. Use 90 to retain sensor parameters after restart.",
        "pageStart": 154,
        "pageEnd": 155
      },
      "cb": {
        "code": "0xCB",
        "name": "MUX front IOs",
        "group": "Hardware",
        "description": "Configure and read the four IOs on a supported MUX32/MUX64 accessory.",
        "source": "Manual v123 · pp. 165–167",
        "options": [
          {
            "code": "01",
            "title": "Set direction",
            "request": "CB 03 01 [channel] [value] CB",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "channel",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "value",
                "1",
                "uint8",
                "—",
                "0=input; 1=output",
                "0"
              ]
            ],
            "notes": "Available on MUX32 and MUX64 front IO channels 1–4.",
            "examples": [
              {
                "title": "Set direction IO1",
                "hex": "CB 03 01 01 01 CB",
                "why": "Configure IO1 as an output."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Set state",
            "request": "CB 03 02 [channel] [value] CB",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "channel",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "value",
                "1",
                "uint8",
                "—",
                "0=low; 1=high",
                "0"
              ]
            ],
            "notes": "Available on MUX32 and MUX64 front IO channels 1–4.",
            "examples": [
              {
                "title": "Set state IO1",
                "hex": "CB 03 02 01 01 CB",
                "why": "Drive IO1 high after configuring it as an output."
              }
            ],
            "help": []
          },
          {
            "code": "81",
            "title": "Read direction",
            "request": "CB 02 81 [channel] CB",
            "response": "CB 03 81 [channel] [value] CB; then ACK: 18 01 83 18",
            "fields": [
              [
                "channel",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "value (response)",
                "1",
                "uint8",
                "—",
                "0=input; 1=output",
                "0"
              ]
            ],
            "notes": "Available on MUX32 and MUX64 front IO channels 1–4.",
            "examples": [
              {
                "title": "Read direction IO1",
                "hex": "CB 02 81 01 CB",
                "why": "Read the input or output direction of IO1."
              }
            ],
            "help": []
          },
          {
            "code": "82",
            "title": "Read state",
            "request": "CB 02 82 [channel] CB",
            "response": "CB 03 82 [channel] [value] CB; then ACK: 18 01 83 18",
            "fields": [
              [
                "channel",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "value (response)",
                "1",
                "uint8",
                "—",
                "0=low; 1=high",
                "0"
              ]
            ],
            "notes": "Available on MUX32 and MUX64 front IO channels 1–4.",
            "examples": [
              {
                "title": "Read state IO1",
                "hex": "CB 02 82 01 CB",
                "why": "Read the logic state of IO1."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 165,
        "pageEnd": 167
      },
      "c2": {
        "code": "0xC2",
        "name": "Set battery mode",
        "group": "Battery",
        "description": "Select battery measurement or automatic switchover threshold. Requires battery module.",
        "source": "Manual v123 · pp. 192–193",
        "options": [
          {
            "code": "02",
            "title": "Measure on battery",
            "request": "C2 02 02 [enabled] C2",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "enabled",
                "1",
                "uint8",
                "—",
                "0=disable; 1=enable",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Enable battery operation",
                "hex": "C2 02 02 01 C2",
                "why": "Applies only to a device with battery hardware."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Minimum remaining capacity",
            "request": "C2 02 03 [percent] C2",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "percent",
                "1",
                "uint8",
                "%",
                "5–100 per functional description",
                "10"
              ]
            ],
            "notes": "At threshold switch to external supply while measurement continues.",
            "examples": [
              {
                "title": "10% switchover threshold",
                "hex": "C2 02 03 0A C2",
                "why": "10 decimal is 0A hexadecimal."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 192,
        "pageEnd": 193
      },
      "c3": {
        "code": "0xC3",
        "name": "Get battery mode",
        "group": "Battery",
        "description": "Read power source, remaining capacity and battery settings.",
        "source": "Manual v123 · pp. 193–194",
        "options": [
          {
            "code": "01",
            "title": "Status and capacity",
            "request": "C3 01 01 C3",
            "response": "C3 03 01 [status] [capacity] C3; then ACK: 18 01 83 18",
            "fields": [
              [
                "status",
                "1",
                "bitmask",
                "—",
                "bit1: power source; bit0: charging; bits7–2: do not care",
                "—"
              ],
              [
                "capacity",
                "1",
                "uint8",
                "%",
                "0–100",
                "—"
              ]
            ],
            "notes": "Status bit1: 1=battery, 0=external. Bit0: 1=charging, 0=not charging. Bits7–2 are do not care.",
            "examples": [
              {
                "title": "Read battery status",
                "hex": "C3 01 01 C3",
                "why": "Decode source bit and capacity; do not interpret reserved bits."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Battery measurement flag",
            "request": "C3 01 02 C3",
            "response": "C3 02 02 [enabled] C3; then ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read battery selection",
                "hex": "C3 01 02 C3",
                "why": "Read whether battery measurement is enabled."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Minimum capacity",
            "request": "C3 01 03 C3",
            "response": "C3 02 03 [percent] C3; then ACK: 18 01 83 18",
            "fields": [
              [
                "percent",
                "1",
                "uint8",
                "%",
                "5–100",
                "10"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read threshold",
                "hex": "C3 01 03 C3",
                "why": "Read configured switch-to-external threshold."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 193,
        "pageEnd": 194
      },
      "c4": {
        "code": "0xC4",
        "name": "Set EIT setup",
        "group": "EIT",
        "description": "Configure EIT frequencies, injection sequence, measurement channels and acquisition settings. Requires EIT-capable hardware.",
        "source": "Manual v123 · pp. 178–181",
        "options": [
          {
            "code": "01",
            "title": "Reset EIT setup",
            "request": "C4 01 01 C4",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Reset before constructing a fresh EIT setup.",
            "examples": [
              {
                "title": "Reset EIT setup",
                "hex": "C4 01 01 C4",
                "why": "Then configure frequencies, excitation, injection and measurement channels."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Burst count",
            "request": "C4 03 02 [count:2] C4",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "count",
                "2",
                "uint16",
                "EIT frames",
                "0=continuous; 1–65535=finite",
                "0"
              ]
            ],
            "notes": "B8 EIT does not use EIS spectrum count; use this setting for automatic stop.",
            "examples": [
              {
                "title": "One EIT frame",
                "hex": "C4 03 02 00 01 C4",
                "why": "Acquire one EIT frame before automatic stop."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Precision",
            "request": "C4 05 03 [precision:4] C4",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "precision",
                "4",
                "float32",
                "—",
                "0–10",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set precision 1",
                "hex": "C4 05 03 3F 80 00 00 C4",
                "why": "Balance stability and acquisition speed."
              }
            ],
            "help": [
              "precision"
            ]
          },
          {
            "code": "04",
            "title": "Add frequency block",
            "request": "C4 0C 04 [fmin:4] [fmax:4] [fcount:2] [ftype] C4",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "fmin / fmax",
                "4",
                "float32 each",
                "Hz",
                "Query connected device",
                "—"
              ],
              [
                "fcount",
                "2",
                "uint16",
                "points",
                "1–128; EIT frequency stack ≤128",
                "—"
              ],
              [
                "ftype",
                "1",
                "uint8",
                "—",
                "0=linear; 1=logarithmic",
                "—"
              ]
            ],
            "notes": "Append frequency blocks in transmission order. The EIT stack holds up to 128 frequencies. Choose frequencies within the limits of the connected instrument.",
            "examples": [
              {
                "title": "Example EIT frequency block",
                "hex": "C4 0C 04 44 7A 00 00 47 C3 50 00 00 0A 01 C4",
                "why": "Append a logarithmic block of 10 frequencies to the EIT stack."
              }
            ],
            "help": []
          },
          {
            "code": "05",
            "title": "Excitation amplitude",
            "request": "C4 [LE] 05 [amplitude:4 or 8] [optional EOPs] C4",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "amplitude",
                "4 / 8",
                "float32 / float64",
                "V / A peak",
                "Voltage 10 mV–1 V; current 100 µA–10 mA",
                "—"
              ],
              [
                "EOP ID",
                "1",
                "uint8",
                "—",
                "03=excitation type",
                "—"
              ],
              [
                "EOP value",
                "4",
                "uint32",
                "—",
                "1=voltage; 2=current",
                "2=current in EIT manual"
              ]
            ],
            "notes": "Without extended options, LE is 05 for float32 or 09 for float64. Each extended option adds five bytes. If you repeat the excitation type option, the first value applies.",
            "examples": [
              {
                "title": "Explicit 0.1 V peak excitation",
                "hex": "C4 0A 05 3D CC CC CD 03 00 00 00 01 C4",
                "why": "Explicit voltage excitation, 0.2 Vpp. LE=0A (10 payload bytes)."
              }
            ],
            "help": [
              "excitation"
            ]
          },
          {
            "code": "06",
            "title": "Add injection pair",
            "request": "C4 03 06 [out] [in] C4",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "out / in",
                "1",
                "uint8 each",
                "channel",
                "Valid electrodes depend on EIT hardware",
                "—"
              ]
            ],
            "notes": "Each request appends one injection pair. The stack holds up to 64 pairs in transmission order. Use electrodes supported by the connected multiplexer.",
            "examples": [
              {
                "title": "Inject from electrode 1 to 2",
                "hex": "C4 03 06 01 02 C4",
                "why": "Check electrode availability on your device. Configure the full injection pattern before starting."
              }
            ],
            "help": []
          },
          {
            "code": "09",
            "title": "Global gain",
            "request": "C4 03 09 01 [gain] C4",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "mode",
                "1",
                "uint8",
                "—",
                "01=global",
                "01"
              ],
              [
                "gain",
                "1",
                "uint8",
                "—",
                "01=gain 1; 02=gain 11",
                "01"
              ]
            ],
            "notes": "Most recently sent gain mode applies.",
            "examples": [
              {
                "title": "Global gain 1",
                "hex": "C4 03 09 01 01 C4",
                "why": "Global gain mode, gain factor 1."
              }
            ],
            "help": []
          },
          {
            "code": "0A",
            "title": "Measurement channels",
            "request": "C4 [LE] 0A [CH1] … [CHn] C4",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "CHx",
                "1",
                "uint8",
                "channel",
                "Hardware-supported electrode number",
                "—"
              ]
            ],
            "notes": "Send one byte per measurement channel. LE equals the number of channels plus one.",
            "examples": [
              {
                "title": "Example channels 1–4",
                "hex": "C4 05 0A 01 02 03 04 C4",
                "why": "Adds channels 1, 2, 3, 4; use only supported channels."
              }
            ],
            "help": []
          }
        ],
        "notes": "Use B8/02 to start acquisition after configuring an EIT setup.",
        "pageStart": 178,
        "pageEnd": 181
      },
      "c5": {
        "code": "0xC5",
        "name": "Get EIT setup",
        "group": "EIT",
        "description": "Read the configured EIT acquisition parameters.",
        "source": "Manual v123 · pp. 181–183",
        "options": [
          {
            "code": "02",
            "title": "Burst count",
            "request": "C5 01 02 C5",
            "response": "C5 03 02 [count:2] C5; then ACK: 18 01 83 18",
            "fields": [
              [
                "count",
                "2",
                "uint16",
                "frames",
                "0=continuous",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read burst count",
                "hex": "C5 01 02 C5",
                "why": "Read finite/continuous EIT mode."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Precision",
            "request": "C5 01 03 C5",
            "response": "C5 05 03 [precision:4] C5; then ACK: 18 01 83 18",
            "fields": [
              [
                "precision",
                "4",
                "float32",
                "—",
                "0–10",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read precision",
                "hex": "C5 01 03 C5",
                "why": "Decode float32."
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "Frequency block readback",
            "request": "C5 01 04 C5",
            "response": "C5 0C 04 [fmin:4] [fmax:4] [fcount:2] [ftype] C5; then ACK: 18 01 83 18",
            "fields": [
              [
                "fmin / fmax",
                "4",
                "float32 each",
                "Hz",
                "Query connected device",
                "—"
              ],
              [
                "fcount",
                "2",
                "uint16",
                "points",
                "1–128; EIT frequency stack ≤128",
                "—"
              ],
              [
                "ftype",
                "1",
                "uint8",
                "—",
                "0=linear; 1=logarithmic",
                "—"
              ]
            ],
            "notes": "The response layout below describes one frequency block. Keep the blocks sent with C4/04 if your application needs the full configuration of a multiblock setup.",
            "examples": [
              {
                "title": "Read EIT frequency configuration",
                "hex": "C5 01 04 C5",
                "why": "Read the EIT frequency configuration."
              }
            ],
            "help": []
          },
          {
            "code": "05",
            "title": "Excitation amplitude",
            "request": "C5 01 05 C5",
            "response": "C5 [LE] 05 [amplitude:8] C5; then ACK: 18 01 83 18",
            "fields": [
              [
                "amplitude",
                "8",
                "float64",
                "V / A peak",
                "Interpret according to configured excitation type",
                "—"
              ]
            ],
            "notes": "The response payload contains option 05 and a float64 amplitude. The fixed LE byte is unspecified for this response. Use C4/05 to set a known amplitude when building a measurement setup.",
            "examples": [
              {
                "title": "Read EIT amplitude",
                "hex": "C5 01 05 C5",
                "why": "Request readback in volts or amperes, according to the configured excitation type."
              }
            ],
            "help": []
          },
          {
            "code": "06",
            "title": "Injection sequence",
            "request": "C5 01 06 C5",
            "response": "C5 [LE] 06 [out1] [in1] … [outN] [inN] C5; then ACK: 18 01 83 18",
            "fields": [
              [
                "out / in",
                "1",
                "uint8 each",
                "channel",
                "Ordered injection pairs",
                "—"
              ]
            ],
            "notes": "Each injection pair uses two bytes. For N pairs in a response, LE equals 1 + 2 × N.",
            "examples": [
              {
                "title": "Read injection sequence",
                "hex": "C5 01 06 C5",
                "why": "Decode pairs in the returned transmission order."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 181,
        "pageEnd": 183
      },
      "b6": {
        "code": "0xB6",
        "name": "Set measurement setup",
        "group": "EIS",
        "description": "Initialize and configure EIS frequency points, compensation, stored setups and feature-specific DC bias.",
        "source": "Manual v123 · pp. 117–126",
        "options": [
          {
            "code": "01",
            "title": "Initialize setup",
            "request": "B6 01 01 B6",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Discards current frequency setup. Configure frontend separately with B0.",
            "examples": [
              {
                "title": "Initialize empty frequency setup",
                "hex": "B6 01 01 B6",
                "why": "Add points or blocks before starting a measurement."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Add single frequency point",
            "request": "B6 [LE] 02 [frequency:4] [precision:4] [amplitude:4] [optional EOPs] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "frequency",
                "4",
                "float32",
                "Hz",
                "Query device limits; 0=DC resistance",
                "—"
              ],
              [
                "precision",
                "4",
                "float32",
                "—",
                "0–10",
                "0"
              ],
              [
                "amplitude",
                "4",
                "float32",
                "V / A peak",
                "Voltage 0.01–1 V; current 0.0001–0.01 A",
                "—"
              ],
              [
                "EOP ID",
                "1",
                "uint8",
                "—",
                "01=point delay; 02=phase sync; 03=excitation type",
                "Omitted"
              ],
              [
                "EOP value",
                "4",
                "uint32",
                "µs / flag / type",
                "Delay 0–180000000 µs; sync 0/1 (≥100 kHz); type 1=voltage,2=current",
                "delay=0; sync=0; type=1"
              ]
            ],
            "notes": "LE=0D+5×EOP count. Point IDs start at 0 across all blocks; total ≤2048. EOPs may be in any order. Last duplicate wins; duplicate identifiers are discouraged. An unknown EOP invalidates the entire command and returns NACK. Point Delay maximum 180,000,000 µs. Phase Sync below 100 kHz returns NACK; added timing depends on signal state, not a fixed delay.",
            "examples": [
              {
                "title": "32 kHz, 0.25 V peak",
                "hex": "B6 0D 02 46 FA 00 00 3F 80 00 00 3E 80 00 00 B6",
                "why": "Adds one point; voltage is default excitation type."
              },
              {
                "title": "Point Delay 1000 µs",
                "hex": "B6 12 02 46 FA 00 00 3F 80 00 00 3E 80 00 00 01 00 00 03 E8 B6",
                "why": "Excitation at current point → wait 1000 µs → acquire."
              },
              {
                "title": "200 kHz with Phase Sync",
                "hex": "B6 12 02 48 43 50 00 3F 80 00 00 3E 80 00 00 02 00 00 00 01 B6",
                "why": "Transitions 1→2 through N−1→N are synchronized. First point unaffected; a following point is required to observe a transition."
              }
            ],
            "help": [
              "phase",
              "delay",
              "precision",
              "excitation"
            ]
          },
          {
            "code": "03",
            "title": "Add frequency block",
            "request": "B6 [LE] 03 [start:4] [stop:4] [count:4] [scale] [precision:4] [amplitude:4] [EOPs] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "start / stop",
                "4",
                "float32 each",
                "Hz",
                "Device frequency limits",
                "—"
              ],
              [
                "count",
                "4",
                "float32",
                "points",
                "Positive integer; includes boundaries; setup total ≤2048",
                "—"
              ],
              [
                "scale",
                "1",
                "uint8",
                "—",
                "0=linear; 1=logarithmic",
                "—"
              ],
              [
                "precision",
                "4",
                "float32",
                "—",
                "0–10",
                "0"
              ],
              [
                "amplitude",
                "4",
                "float32",
                "V / A peak",
                "Voltage 0.01–1 V; current 0.0001–0.01 A",
                "—"
              ],
              [
                "EOP ID",
                "1",
                "uint8",
                "—",
                "01=point delay; 02=phase sync; 03=excitation type",
                "Omitted"
              ],
              [
                "EOP value",
                "4",
                "uint32",
                "µs / flag / type",
                "Delay 0–180000000 µs; sync 0/1 (≥100 kHz); type 1=voltage,2=current",
                "delay=0; sync=0; type=1"
              ]
            ],
            "notes": "LE=16+5×EOP count. Count=1 uses start only; stop/scale ignored but still transmitted. EOPs may be in any order. Last duplicate wins; duplicate identifiers are discouraged. An unknown EOP invalidates the entire command and returns NACK. Point Delay maximum 180,000,000 µs. Phase Sync below 100 kHz returns NACK; added timing depends on signal state, not a fixed delay.",
            "examples": [
              {
                "title": "10-point log block",
                "hex": "B6 16 03 44 7A 00 00 47 C3 50 00 41 20 00 00 01 3F 80 00 00 3E 80 00 00 B6",
                "why": "10 measured points including 1 kHz and 100 kHz. IDs continue after all prior blocks."
              },
              {
                "title": "One-point block",
                "hex": "B6 16 03 44 7A 00 00 47 C3 50 00 3F 80 00 00 01 3F 80 00 00 3E 80 00 00 B6",
                "why": "Measures start frequency 1 kHz only; stop and scale are do not care."
              }
            ],
            "help": [
              "count",
              "phase",
              "delay",
              "excitation"
            ]
          },
          {
            "code": "05",
            "title": "Set amplitude",
            "request": "B6 06 05 [type] [amplitude:4] B6 OR B6 08 05 [Row:2] [type] [amplitude:4] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "Row (optional)",
                "2",
                "uint16",
                "frequency ID",
                "0-based individual point across all blocks",
                "—"
              ],
              [
                "type",
                "1",
                "uint8",
                "—",
                "1=voltage; 2=current",
                "—"
              ],
              [
                "amplitude",
                "4",
                "float32",
                "V / A peak",
                "Voltage 0.01–1 V; current 0.0001–0.01 A",
                "—"
              ]
            ],
            "notes": "Without Row: all points. With Row: one existing point.",
            "examples": [
              {
                "title": "Set all amplitudes to 0.25 V",
                "hex": "B6 06 05 01 3E 80 00 00 B6",
                "why": "LE=06; all configured frequencies."
              },
              {
                "title": "Set ID 0 amplitude",
                "hex": "B6 08 05 00 00 01 3E 80 00 00 B6",
                "why": "LE=08; only first configured point."
              }
            ],
            "help": [
              "excitation"
            ]
          },
          {
            "code": "10",
            "title": "Start compensation",
            "request": "B6 01 10 B6 OR B6 02 10 [sendData] B6",
            "response": "ACK: 18 01 83 18; asynchronous B7 interaction requests",
            "fields": [
              [
                "sendData (optional)",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "0"
              ]
            ],
            "notes": "Configure the frontend and frequency setup before starting compensation. Use a fixed current range for the workflow shown in this guide.",
            "examples": [
              {
                "title": "Start compensation",
                "hex": "B6 01 10 B6",
                "why": "Await ACK and handle B7 open/short/load requests."
              }
            ],
            "help": []
          },
          {
            "code": "11",
            "title": "Compensation acknowledge",
            "request": "B6 01 11 B6 OR B6 02 11 [avgCount] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "avgCount (optional)",
                "1",
                "uint8",
                "spectra",
                "Number of averages. Omit the field for a single acquisition.",
                "1 if omitted"
              ]
            ],
            "notes": "Answer a B7 compensation interaction request after preparing the requested physical condition.",
            "examples": [
              {
                "title": "Continue without explicit averaging",
                "hex": "B6 01 11 B6",
                "why": "Optional averaging field omitted; documented default 1."
              },
              {
                "title": "Average 10 spectra",
                "hex": "B6 02 11 0A B6",
                "why": "Continue current compensation step with ten averages."
              }
            ],
            "help": []
          },
          {
            "code": "12",
            "title": "Abort compensation",
            "request": "B6 01 12 B6",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Answer interaction request with CNACK to abort.",
            "examples": [
              {
                "title": "Compensation abort",
                "hex": "B6 01 12 B6",
                "why": "Aborts the current compensation procedure."
              }
            ],
            "help": []
          },
          {
            "code": "13",
            "title": "Redo Open",
            "request": "B6 01 13 B6",
            "response": "ACK: 18 01 83 18; B7 01 13 B7 interaction request",
            "fields": [],
            "notes": "Applicable when idle after compensation completes or just after the corresponding step completed.",
            "examples": [
              {
                "title": "Redo Open",
                "hex": "B6 01 13 B6",
                "why": "Prepare requested condition and acknowledge the interaction."
              }
            ],
            "help": []
          },
          {
            "code": "14",
            "title": "Redo Short",
            "request": "B6 01 14 B6",
            "response": "ACK: 18 01 83 18; B7 01 14 B7 interaction request",
            "fields": [],
            "notes": "Applicable when idle after compensation completes or just after the corresponding step completed.",
            "examples": [
              {
                "title": "Redo Short",
                "hex": "B6 01 14 B6",
                "why": "Prepare requested condition and acknowledge the interaction."
              }
            ],
            "help": []
          },
          {
            "code": "15",
            "title": "Redo Load",
            "request": "B6 01 15 B6",
            "response": "ACK: 18 01 83 18; B7 01 15 B7 interaction request",
            "fields": [],
            "notes": "Applicable when idle after compensation completes or just after the corresponding step completed.",
            "examples": [
              {
                "title": "Redo Load",
                "hex": "B6 01 15 B6",
                "why": "Prepare requested condition and acknowledge the interaction."
              }
            ],
            "help": []
          },
          {
            "code": "16",
            "title": "Set reference load",
            "request": "B6 06 16 [type] [value:4] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "type",
                "1",
                "uint8",
                "—",
                "1=resistor; 2=capacitor",
                "—"
              ],
              [
                "value",
                "4",
                "float32",
                "Ω / F",
                "Reference load value",
                "—"
              ]
            ],
            "notes": "Set load value before acknowledging the B7 load interaction.",
            "examples": [
              {
                "title": "100 Ω reference load",
                "hex": "B6 06 16 01 42 C8 00 00 B6",
                "why": "Then send B6/11 once load is connected."
              }
            ],
            "help": []
          },
          {
            "code": "17",
            "title": "Reset / write compensation data",
            "request": "B6 02 17 01 B6 OR B6 1D 17 02 [channel] [Row:2] [six float32 values] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "subfunction",
                "1",
                "uint8",
                "—",
                "01=invalidate; 02=write",
                "—"
              ],
              [
                "channel",
                "1",
                "uint8",
                "channel",
                "1..configured channel count per B7 description",
                "—"
              ],
              [
                "Row",
                "2",
                "uint16",
                "frequency ID",
                "0..total points−1",
                "—"
              ],
              [
                "Open Re/Im, Short Re/Im, Load Re/Im",
                "4",
                "float32 each",
                "Ω",
                "Open Re/Im, Short Re/Im, Load Re/Im",
                "—"
              ]
            ],
            "notes": "Writing marks setup compensated. All frequencies and all channels must have valid compensation data. Values are complex impedance components in ohms.",
            "examples": [
              {
                "title": "Invalidate compensation",
                "hex": "B6 02 17 01 B6",
                "why": "Marks current compensation invalid. Read status with B7/17."
              }
            ],
            "help": []
          },
          {
            "code": "18",
            "title": "Compensation channel",
            "request": "B6 01 18 B6 OR B6 0E 18 [mode] [C][Cext:2][R][Rext:2][WS][WSext:2][W][Wext:2] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "mode",
                "1",
                "uint8",
                "—",
                "1=2-point; 2=4-point; 3=3-point",
                "—"
              ],
              [
                "port selector",
                "1",
                "uint8 per electrode",
                "—",
                "1=main; 2=extension; 3=second port",
                "—"
              ],
              [
                "extension channel",
                "2",
                "uint16 per electrode",
                "—",
                "Main port=0; module-supported channel otherwise",
                "—"
              ]
            ],
            "notes": "Use the short form to acquire compensation separately for each configured channel. The explicit routing format below carries all four electrode triplets. For a 2- or 3-point setup, use individual compensation.",
            "examples": [
              {
                "title": "Individual compensation mode",
                "hex": "B6 01 18 B6",
                "why": "Separate compensation data per configured measurement channel."
              }
            ],
            "help": [
              "stack"
            ]
          },
          {
            "code": "20",
            "title": "Load setup from slot",
            "request": "B6 02 20 [slot] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "slot",
                "1",
                "uint8",
                "slot",
                "1–255",
                "—"
              ]
            ],
            "notes": "Complete setup including compensation data. Slots 1–255 may be overwritten. Empty slots cannot be loaded. Slots survive restart; no slot is loaded automatically at startup.",
            "examples": [
              {
                "title": "Load slot 5",
                "hex": "B6 02 20 05 B6",
                "why": "Recall previously saved configuration; use B7/20 to store."
              }
            ],
            "help": []
          },
          {
            "code": "30",
            "title": "Enable / disable DC bias",
            "request": "B6 02 30 [enabled] B6",
            "response": "ACK: 18 01 83 18; bias regulation reports its outcome asynchronously",
            "fields": [
              [
                "enabled",
                "1",
                "uint8",
                "—",
                "0=disable; 1=enable",
                "—"
              ]
            ],
            "notes": "DC bias uses measurement port 1 (BNC). Connect the device under test and configure the frontend and frequency setup while idle. Set the target with B6/33 before enabling. Regulation starts at 0 V and proceeds toward the target.",
            "examples": [
              {
                "title": "Disable DC bias",
                "hex": "B6 02 30 00 B6",
                "why": "Set the enable switch to 00 to deactivate DC bias."
              }
            ],
            "help": []
          },
          {
            "code": "32",
            "title": "Abort DC-bias regulation",
            "request": "B6 01 32 B6",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Use this request to abort DC bias regulation on measurement port 1.",
            "examples": [
              {
                "title": "Abort regulation",
                "hex": "B6 01 32 B6",
                "why": "Request cancellation of ongoing DC bias regulation."
              }
            ],
            "help": []
          },
          {
            "code": "33",
            "title": "Set DC-bias target",
            "request": "B6 05 33 [target:4] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "target",
                "4",
                "float32",
                "V",
                "−1 to +1 V; excitation/bias combination constrained by 1 V limit",
                "—"
              ]
            ],
            "notes": "Set the target before enabling DC bias. Keep the combined excitation and bias within the 1 V measurement limit.",
            "examples": [
              {
                "title": "Example target 0.5 V",
                "hex": "B6 05 33 3F 00 00 00 B6",
                "why": "Set the DC bias target to 0.5 V. Allow for the AC excitation when selecting the target."
              }
            ],
            "help": []
          }
        ],
        "notes": "Configure the frontend separately with B0. Call B6/01 before replacing the frequency setup.",
        "pageStart": 117,
        "pageEnd": 126
      },
      "b7": {
        "code": "0xB7",
        "name": "Get setup / interaction messages",
        "group": "EIS",
        "description": "Read measurement settings and compensation data, save a setup slot, or interpret asynchronous device events.",
        "source": "Manual v123 · pp. 126–130",
        "options": [
          {
            "code": "01",
            "title": "Frequency count",
            "request": "B7 01 01 B7",
            "response": "B7 03 01 [count:2] B7; then ACK: 18 01 83 18",
            "fields": [
              [
                "count (response)",
                "2",
                "uint16",
                "points",
                "Total across all frequency blocks; ≤2048",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read configured point count",
                "hex": "B7 01 01 B7",
                "why": "Use to verify expected number of frequency IDs."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Frequency-point information",
            "request": "B7 [LE] 02 [Row:2] [optional EOP IDs] B7",
            "response": "B7 [LE] 02 [frequency:4] [precision:4] [amplitude:4] [EOP ID][value:4] … B7; then ACK: 18 01 83 18",
            "fields": [
              [
                "Row",
                "2",
                "uint16",
                "frequency ID",
                "0-based across all blocks",
                "—"
              ],
              [
                "EOP IDs",
                "1",
                "uint8 each",
                "—",
                "Optional list: 01=delay; 02=sync; 03=excitation type",
                "—"
              ],
              [
                "frequency / precision / amplitude",
                "4",
                "float32 each",
                "Hz / — / V or A peak",
                "Current point values",
                "—"
              ],
              [
                "returned EOP value",
                "4",
                "uint32",
                "µs / flag / type",
                "By EOP ID",
                "—"
              ]
            ],
            "notes": "Send LE=03 to read the base fields for one point. To request extended fields, append their option IDs. Each returned option value follows its ID.",
            "examples": [
              {
                "title": "Read ID 0",
                "hex": "B7 03 02 00 00 B7",
                "why": "Read the first frequency point."
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "Frequency list",
            "request": "B7 01 04 B7",
            "response": "B7 [LE] 04 [freq1:4] … [freqN:4] B7 (multiple frames); then ACK: 18 01 83 18",
            "fields": [
              [
                "frequencies",
                "4",
                "float32 each",
                "Hz",
                "Configured order",
                "—"
              ]
            ],
            "notes": "Each response holds up to 60 complete float32 values. LE equals 1 + 4 × the number of values. A 64-point list uses two frames with LE F1 and 11. Use B7/01 to obtain the total point count.",
            "examples": [
              {
                "title": "Read all frequencies",
                "hex": "B7 01 04 B7",
                "why": "Collect multiple data frames; ACK is separate. IDs correspond to zero-based list order."
              }
            ],
            "help": []
          },
          {
            "code": "13",
            "title": "Open interaction",
            "request": "Device → host: B7 01 13 B7",
            "response": "Host replies B6/11 to continue or B6/12 to abort",
            "fields": [],
            "notes": "",
            "examples": [
              {
                "title": "Received Open request",
                "hex": "B7 01 13 B7",
                "why": "Prepare the terminals so they are open before acknowledging the request."
              }
            ],
            "help": []
          },
          {
            "code": "14",
            "title": "Short interaction",
            "request": "Device → host: B7 01 14 B7",
            "response": "Host replies B6/11 to continue or B6/12 to abort",
            "fields": [],
            "notes": "",
            "examples": [
              {
                "title": "Received Short request",
                "hex": "B7 01 14 B7",
                "why": "Prepare the terminals so they are shorted before acknowledging the request."
              }
            ],
            "help": []
          },
          {
            "code": "15",
            "title": "Load interaction",
            "request": "Device → host: B7 01 15 B7",
            "response": "Host replies B6/11 to continue or B6/12 to abort",
            "fields": [],
            "notes": "Set the load with B6/16 before acknowledging with B6/11.",
            "examples": [
              {
                "title": "Received Load request",
                "hex": "B7 01 15 B7",
                "why": "Prepare the terminals so they are connected to the reference load before acknowledging the request."
              }
            ],
            "help": []
          },
          {
            "code": "10",
            "title": "Compensation completed event",
            "request": "Device → host: B7 01 10 B7",
            "response": "No reply specified",
            "fields": [],
            "notes": "The device sends this event after completing open, short and load measurements.",
            "examples": [
              {
                "title": "Received compensation completion",
                "hex": "B7 01 10 B7",
                "why": "Compensation workflow completion, distinct from spectrum completion."
              }
            ],
            "help": []
          },
          {
            "code": "17",
            "title": "Compensation status / data",
            "request": "B7 02 17 01 B7 OR B7 03 17 02 [channel] B7",
            "response": "B7 03 17 01 [status] B7 OR B7 1D 17 02 [channel][Row:2][six float32 values] B7; then ACK: 18 01 83 18",
            "fields": [
              [
                "subfunction",
                "1",
                "uint8",
                "—",
                "1=status; 2=data",
                "—"
              ],
              [
                "status",
                "1",
                "uint8",
                "—",
                "0=uncompensated; 1=compensated",
                "—"
              ],
              [
                "channel",
                "1",
                "uint8",
                "channel",
                "1..configured channel count",
                "—"
              ],
              [
                "Row",
                "2",
                "uint16",
                "frequency ID",
                "0-based",
                "—"
              ],
              [
                "six complex components",
                "4",
                "float32 each",
                "Ω",
                "Open Re/Im; Short Re/Im; Load Re/Im",
                "—"
              ]
            ],
            "notes": "Read compensation separately for each channel. The device returns one frame per configured frequency. Use the Row field to associate each set of impedance components with its frequency.",
            "examples": [
              {
                "title": "Read compensation status",
                "hex": "B7 02 17 01 B7",
                "why": "Read the compensation status of the active setup."
              },
              {
                "title": "Read channel 1 compensation",
                "hex": "B7 03 17 02 01 B7",
                "why": "Request the Open, Short and Load impedance components for channel 1."
              }
            ],
            "help": []
          },
          {
            "code": "20",
            "title": "Save setup to slot",
            "request": "B7 02 20 [slot] B7",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "slot",
                "1",
                "uint8",
                "slot",
                "1–255 per B6 slot description",
                "—"
              ]
            ],
            "notes": "Complete setup including compensation data. Slots 1–255 may be overwritten. Empty slots cannot be loaded. Slots survive restart; no slot is loaded automatically at startup.",
            "examples": [
              {
                "title": "Save slot 5",
                "hex": "B7 02 20 05 B7",
                "why": "Writes device storage. Recall using B6/20."
              }
            ],
            "help": []
          },
          {
            "code": "33",
            "title": "Read DC bias",
            "request": "B7 01 33 B7",
            "response": "B7 05 33 [bias:4] B7; then ACK: 18 01 83 18",
            "fields": [
              [
                "bias",
                "4",
                "float32",
                "V",
                "Currently configured DC bias",
                "—"
              ]
            ],
            "notes": "Read configured DC-bias value in V; measurement port 1 only.",
            "examples": [
              {
                "title": "Read DC bias",
                "hex": "B7 01 33 B7",
                "why": "Decode four-byte float in volts."
              }
            ],
            "help": []
          },
          {
            "code": "31",
            "title": "DC bias target reached",
            "request": "Device → host: B7 01 31 B7",
            "response": "No host acknowledgement required",
            "fields": [],
            "notes": "This event indicates that the target was reached. The failure-event encoding is outside the scope of this reference.",
            "examples": [
              {
                "title": "Illustrative success event",
                "hex": "B7 01 31 B7",
                "why": "The device has reached the requested DC bias target."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 126,
        "pageEnd": 130
      },
      "b0": {
        "code": "0xB0",
        "name": "Set frontend settings",
        "group": "EIS",
        "description": "Configure electrode routing and input ranges. Each configuration is appended to the channel stack.",
        "source": "Manual v123 · pp. 108–111",
        "options": [
          {
            "code": "configure",
            "title": "Configure frontend",
            "request": "B0 [LE] [mode] [current range] [voltage range] [electrode triplets] B0",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "mode",
                "1",
                "uint8",
                "—",
                "01=2-point; 02=4-point; 03=3-point",
                "—"
              ],
              [
                "current range",
                "1",
                "uint8",
                "A",
                "00=auto; 01=±10 mA; 02=±100 µA; 04=±1 µA; 06=±10 nA",
                "—"
              ],
              [
                "voltage range (optional)",
                "1",
                "uint8",
                "V",
                "01=±1 V; 02=±90 mV",
                "01 if omitted"
              ],
              [
                "electrode port",
                "1",
                "uint8 each",
                "—",
                "01=main; 02=extension; 03=second/internal port, device-dependent",
                "—"
              ],
              [
                "extension channel",
                "2",
                "uint16 each",
                "channel",
                "Main port=0; otherwise module-supported channel",
                "—"
              ]
            ],
            "notes": "2-point: C,W (6 bytes). 3-point: C,R,W (9). 4-point: C,R,WS,W (12). With explicit voltage range LE=09/0C/0F. Omitting voltage range reduces LE by one. Clear stack before replacing configurations; up to 128 entries.",
            "examples": [
              {
                "title": "4-point main port",
                "hex": "B0 0F 02 00 01 01 00 00 01 00 00 01 00 00 01 00 00 B0",
                "why": "All electrodes on main port; auto current range and ±1 V voltage range."
              },
              {
                "title": "2-point main port",
                "hex": "B0 09 01 01 01 01 00 00 01 00 00 B0",
                "why": "Fixed ±10 mA current range; 2-point configuration."
              }
            ],
            "help": [
              "stack",
              "range"
            ]
          },
          {
            "code": "clear",
            "title": "Clear channel stack",
            "request": "B0 03 FF FF FF B0",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Removes all frontend configurations. Configure at least one channel before measuring.",
            "examples": [
              {
                "title": "Clear frontend stack",
                "hex": "B0 03 FF FF FF B0",
                "why": "Await ACK, then append new frontend settings."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 108,
        "pageEnd": 111
      },
      "b8": {
        "code": "0xB8",
        "name": "Start / stop measurement",
        "group": "Measurement",
        "description": "Acquire EIS spectra or start EIT; configure the corresponding setup before starting.",
        "source": "Manual v123 · pp. 130–133",
        "options": [
          {
            "code": "01",
            "title": "Start EIS",
            "request": "B8 03 01 [spectra:2] B8",
            "response": "ACK: 18 01 83 18; streamed B8 measurement frames",
            "fields": [
              [
                "spectra",
                "2",
                "uint16",
                "spectra/channel",
                "0=continuous; 1–65535=finite",
                "—"
              ]
            ],
            "notes": "Complete a spectrum by receiving all expected frequency IDs. Channels start at 1 and follow the frontend stack; measurement packets carry no channel ID. Count spectra for every channel.",
            "examples": [
              {
                "title": "Acquire one spectrum per channel",
                "hex": "B8 03 01 00 01 B8",
                "why": "Automatic stop after one spectrum per configured channel."
              },
              {
                "title": "Continuous EIS",
                "hex": "B8 03 01 00 00 B8",
                "why": "Continue until B8/00 stop."
              }
            ],
            "help": [
              "stream"
            ]
          },
          {
            "code": "00",
            "title": "Stop acquisition",
            "request": "B8 01 00 B8",
            "response": "ACK: 18 01 83 18 after stopping; buffered data may still follow",
            "fields": [],
            "notes": "Immediately stops measurement, disables signal generation and disconnects DUT via frontend relays. Previously acquired buffered data can still arrive after ACK; ACK is not a buffer-drained indication.",
            "examples": [
              {
                "title": "Stop running measurement",
                "hex": "B8 01 00 B8",
                "why": "Continue parsing buffered data after ACK; treat a partial final spectrum as incomplete."
              }
            ],
            "help": [
              "stream"
            ]
          },
          {
            "code": "02",
            "title": "Start EIT",
            "request": "B8 01 02 B8",
            "response": "ACK: 18 01 83 18, followed by EIT measurement data",
            "fields": [],
            "notes": "Configure C4 first. For a finite EIT acquisition, set the burst count through C4/02.",
            "examples": [
              {
                "title": "Start EIT",
                "hex": "B8 01 02 B8",
                "why": "Start acquisition with the active EIT setup. This reference covers EIT configuration and control. EIT measurement packets require a separate data format specification."
              }
            ],
            "help": []
          },
          {
            "code": "data",
            "title": "EIS measurement frames",
            "request": "Device → host: B8 [LE] [ID:2] [timestamp?] [range?] [Re:4] [Im:4] B8",
            "response": "Streamed data; not a host request",
            "fields": [
              [
                "ID",
                "2",
                "uint16",
                "frequency ID",
                "0-based across all frequency blocks",
                "—"
              ],
              [
                "timestamp (optional)",
                "4 / 5",
                "unsigned integer",
                "ms / µs",
                "Depends on 97/98",
                "Disabled"
              ],
              [
                "current range (optional)",
                "1",
                "uint8",
                "range code",
                "Per-point input range",
                "Disabled"
              ],
              [
                "real / imaginary",
                "4",
                "float32 each",
                "Ω",
                "Complex impedance; DC imaginary=0",
                "—"
              ]
            ],
            "notes": "LE: 0A no options; 0B range only; 0E ms only; 0F µs only OR ms+range; 10 µs+range. Configure decoder from active options, not length alone.",
            "examples": [
              {
                "title": "Default output · 100 − j10 Ω",
                "hex": "B8 0A 00 00 42 C8 00 00 C1 20 00 00 B8",
                "why": "Example impedance at frequency ID 0: 100 − j10 Ω."
              },
              {
                "title": "µs timestamp and range",
                "hex": "B8 10 00 00 00 00 0F 42 40 01 42 C8 00 00 C1 20 00 00 B8",
                "why": "LE=10 with both a microsecond timestamp and current range enabled."
              }
            ],
            "help": [
              "stream"
            ]
          }
        ],
        "notes": "",
        "pageStart": 130,
        "pageEnd": 133
      },
      "d0": {
        "code": "0xD0",
        "name": "Get ARM firmware ID",
        "group": "System",
        "description": "Read ARM firmware revision and build.",
        "source": "Manual v123 · pp. 137–138",
        "options": [
          {
            "code": "id",
            "title": "Read ARM ID",
            "request": "D0 00 D0",
            "response": "D0 06 [internal:2] [revision:2] [build:2] D0; then ACK: 18 01 83 18",
            "fields": [
              [
                "internal",
                "2",
                "reserved",
                "—",
                "—",
                "—"
              ],
              [
                "revision",
                "2",
                "uint16",
                "—",
                "—",
                "—"
              ],
              [
                "build",
                "2",
                "uint16",
                "—",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read ARM firmware version",
                "hex": "D0 00 D0",
                "why": "The data frame arrives before the acknowledgement."
              },
              {
                "title": "Illustrative ARM response",
                "hex": "D0 06 01 05 00 3C 00 1D D0",
                "why": "Example response for revision 60, build 29."
              }
            ],
            "help": []
          }
        ],
        "notes": "",
        "pageStart": 137,
        "pageEnd": 138
      }
    },
    "frames": {
      "18 01 83 18": [
        {
          "label": "CT · start",
          "bytes": "18",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "Status",
          "bytes": "83",
          "desc": "Command executed successfully.",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "18",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "90 00 90": [
        {
          "label": "CT · start",
          "bytes": "90",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "90",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "97 02 01 01 97": [
        {
          "label": "CT · start",
          "bytes": "97",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "timestamp ms",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "01",
          "desc": "0=disable; 1=enable.",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "97",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "97 02 02 01 97": [
        {
          "label": "CT · start",
          "bytes": "97",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "timestamp µs",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "01",
          "desc": "0=disable; 1=enable.",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "97",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "97 02 04 01 97": [
        {
          "label": "CT · start",
          "bytes": "97",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "04",
          "desc": "current-range output",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "01",
          "desc": "0=disable; 1=enable.",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "97",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "98 01 01 98": [
        {
          "label": "CT · start",
          "bytes": "98",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "98",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "98 01 02 98": [
        {
          "label": "CT · start",
          "bytes": "98",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "98",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "98 01 03 98": [
        {
          "label": "CT · start",
          "bytes": "98",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "Frequency-limit query",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "98",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "98 01 04 98": [
        {
          "label": "CT · start",
          "bytes": "98",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "04",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "98",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "A1 00 A1": [
        {
          "label": "CT · start",
          "bytes": "A1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "A1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B1 01 00 B1": [
        {
          "label": "CT · start",
          "bytes": "B1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "Count query",
          "bytes": "00",
          "desc": "Count query",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B1 02 00 01 B1": [
        {
          "label": "CT · start",
          "bytes": "B1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "Channel",
          "bytes": "00 01",
          "desc": "1-based channel-stack entry.",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B5 00 B5": [
        {
          "label": "CT · start",
          "bytes": "B5",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "B5",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B9 04 00 00 03 E8 B9": [
        {
          "label": "CT · start",
          "bytes": "B9",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "04",
          "desc": "4 payload bytes; total frame length 7.",
          "type": "length"
        },
        {
          "label": "Sync Time · µs",
          "bytes": "00 00 03 E8",
          "desc": "Sync Time · µs",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B9",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BA 00 BA": [
        {
          "label": "CT · start",
          "bytes": "BA",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "BA",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BD 05 01 C0 A8 01 64 BD": [
        {
          "label": "CT · start",
          "bytes": "BD",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "IPv4",
          "bytes": "C0 A8 01 64",
          "desc": "192.168.1.100, illustrative address.",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "BD",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BD 02 03 01 BD": [
        {
          "label": "CT · start",
          "bytes": "BD",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "DHCP",
          "bytes": "01",
          "desc": "DHCP",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BD",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BE 01 01 BE": [
        {
          "label": "CT · start",
          "bytes": "BE",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BE",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BE 01 02 BE": [
        {
          "label": "CT · start",
          "bytes": "BE",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BE",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BE 01 03 BE": [
        {
          "label": "CT · start",
          "bytes": "BE",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BE",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CF 05 00 00 00 00 3C CF": [
        {
          "label": "CT · start",
          "bytes": "CF",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "Subcommand",
          "bytes": "00",
          "desc": "Subcommand",
          "type": "option"
        },
        {
          "label": "Interval · s",
          "bytes": "00 00 00 3C",
          "desc": "Interval · s",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "CF",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "D1 00 D1": [
        {
          "label": "CT · start",
          "bytes": "D1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "D1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "D2 00 D2": [
        {
          "label": "CT · start",
          "bytes": "D2",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "D2",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "99 02 01 01 99": [
        {
          "label": "CT · start",
          "bytes": "99",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "IO vector",
          "bytes": "01",
          "desc": "0=input; 1=output; bit0=IO1",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "99",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "99 02 02 01 99": [
        {
          "label": "CT · start",
          "bytes": "99",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "IO vector",
          "bytes": "01",
          "desc": "0=low; 1=high; bit0=IO1",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "99",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9A 01 01 9A": [
        {
          "label": "CT · start",
          "bytes": "9A",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "9A",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9A 01 02 9A": [
        {
          "label": "CT · start",
          "bytes": "9A",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "9A",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9B 05 01 45 6D 80 00 9B": [
        {
          "label": "CT · start",
          "bytes": "9B",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Beta",
          "bytes": "45 6D 80 00",
          "desc": "K",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "9B",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9B 05 02 46 1C 40 00 9B": [
        {
          "label": "CT · start",
          "bytes": "9B",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Nominal resistance",
          "bytes": "46 1C 40 00",
          "desc": "Ω",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "9B",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9B 05 03 43 95 13 33 9B": [
        {
          "label": "CT · start",
          "bytes": "9B",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Reference temperature",
          "bytes": "43 95 13 33",
          "desc": "K",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "9B",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9C 01 01 9C": [
        {
          "label": "CT · start",
          "bytes": "9C",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "9C",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9C 01 02 9C": [
        {
          "label": "CT · start",
          "bytes": "9C",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "9C",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9C 01 03 9C": [
        {
          "label": "CT · start",
          "bytes": "9C",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "9C",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9C 01 04 9C": [
        {
          "label": "CT · start",
          "bytes": "9C",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "04",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "9C",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9D 05 01 45 6D 80 00 9D": [
        {
          "label": "CT · start",
          "bytes": "9D",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Beta",
          "bytes": "45 6D 80 00",
          "desc": "K",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "9D",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9D 05 02 46 1C 40 00 9D": [
        {
          "label": "CT · start",
          "bytes": "9D",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Nominal resistance",
          "bytes": "46 1C 40 00",
          "desc": "Ω",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "9D",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9D 05 03 43 95 13 33 9D": [
        {
          "label": "CT · start",
          "bytes": "9D",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Reference temperature",
          "bytes": "43 95 13 33",
          "desc": "K",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "9D",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9E 01 01 9E": [
        {
          "label": "CT · start",
          "bytes": "9E",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "9E",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9E 01 02 9E": [
        {
          "label": "CT · start",
          "bytes": "9E",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "9E",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9E 01 03 9E": [
        {
          "label": "CT · start",
          "bytes": "9E",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "9E",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "9E 01 04 9E": [
        {
          "label": "CT · start",
          "bytes": "9E",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "04",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "9E",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CB 03 01 01 01 CB": [
        {
          "label": "CT · start",
          "bytes": "CB",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Channel",
          "bytes": "01",
          "desc": "IO channel 1",
          "type": "option"
        },
        {
          "label": "Value",
          "bytes": "01",
          "desc": "0=input; 1=output",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "CB",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CB 03 02 01 01 CB": [
        {
          "label": "CT · start",
          "bytes": "CB",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Channel",
          "bytes": "01",
          "desc": "IO channel 1",
          "type": "option"
        },
        {
          "label": "Value",
          "bytes": "01",
          "desc": "0=low; 1=high",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "CB",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CB 02 81 01 CB": [
        {
          "label": "CT · start",
          "bytes": "CB",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "81",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Channel",
          "bytes": "01",
          "desc": "IO channel 1",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "CB",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CB 02 82 01 CB": [
        {
          "label": "CT · start",
          "bytes": "CB",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "82",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Channel",
          "bytes": "01",
          "desc": "IO channel 1",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "CB",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C2 02 02 01 C2": [
        {
          "label": "CT · start",
          "bytes": "C2",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Enabled",
          "bytes": "01",
          "desc": "Enabled",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C2",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C2 02 03 0A C2": [
        {
          "label": "CT · start",
          "bytes": "C2",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Capacity · %",
          "bytes": "0A",
          "desc": "Capacity · %",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C2",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C3 01 01 C3": [
        {
          "label": "CT · start",
          "bytes": "C3",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C3",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C3 01 02 C3": [
        {
          "label": "CT · start",
          "bytes": "C3",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C3",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C3 01 03 C3": [
        {
          "label": "CT · start",
          "bytes": "C3",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C3",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C4 01 01 C4": [
        {
          "label": "CT · start",
          "bytes": "C4",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C4",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C4 03 02 00 01 C4": [
        {
          "label": "CT · start",
          "bytes": "C4",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Burst count",
          "bytes": "00 01",
          "desc": "Burst count",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "C4",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C4 05 03 3F 80 00 00 C4": [
        {
          "label": "CT · start",
          "bytes": "C4",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "C4",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C4 0C 04 44 7A 00 00 47 C3 50 00 00 0A 01 C4": [
        {
          "label": "CT · start",
          "bytes": "C4",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "0C",
          "desc": "12 payload bytes; total frame length 15.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "04",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Start · Hz",
          "bytes": "44 7A 00 00",
          "desc": "Start · Hz",
          "type": "data"
        },
        {
          "label": "Stop · Hz",
          "bytes": "47 C3 50 00",
          "desc": "Stop · Hz",
          "type": "data"
        },
        {
          "label": "Count",
          "bytes": "00 0A",
          "desc": "Count",
          "type": "data"
        },
        {
          "label": "Scale",
          "bytes": "01",
          "desc": "0=linear; 1=logarithmic",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C4",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C4 0A 05 3D CC CC CD 03 00 00 00 01 C4": [
        {
          "label": "CT · start",
          "bytes": "C4",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "0A",
          "desc": "10 payload bytes; total frame length 13.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "05",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3D CC CC CD",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "EOP",
          "bytes": "03",
          "desc": "EOP",
          "type": "option"
        },
        {
          "label": "Excitation type",
          "bytes": "00 00 00 01",
          "desc": "Excitation type",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "C4",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C4 03 06 01 02 C4": [
        {
          "label": "CT · start",
          "bytes": "C4",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "06",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Out",
          "bytes": "01",
          "desc": "Out",
          "type": "option"
        },
        {
          "label": "In",
          "bytes": "02",
          "desc": "In",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C4",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C4 03 09 01 01 C4": [
        {
          "label": "CT · start",
          "bytes": "C4",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "09",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Mode",
          "bytes": "01",
          "desc": "Mode",
          "type": "option"
        },
        {
          "label": "Gain",
          "bytes": "01",
          "desc": "Gain",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C4",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C4 05 0A 01 02 03 04 C4": [
        {
          "label": "CT · start",
          "bytes": "C4",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "0A",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CH1",
          "bytes": "01",
          "desc": "CH1",
          "type": "option"
        },
        {
          "label": "CH2",
          "bytes": "02",
          "desc": "CH2",
          "type": "option"
        },
        {
          "label": "CH3",
          "bytes": "03",
          "desc": "CH3",
          "type": "option"
        },
        {
          "label": "CH4",
          "bytes": "04",
          "desc": "CH4",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C4",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C5 01 02 C5": [
        {
          "label": "CT · start",
          "bytes": "C5",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C5",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C5 01 03 C5": [
        {
          "label": "CT · start",
          "bytes": "C5",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C5",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C5 01 04 C5": [
        {
          "label": "CT · start",
          "bytes": "C5",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "04",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C5",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C5 01 05 C5": [
        {
          "label": "CT · start",
          "bytes": "C5",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "05",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C5",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C5 01 06 C5": [
        {
          "label": "CT · start",
          "bytes": "C5",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "06",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C5",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 01 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 0D 02 46 FA 00 00 3F 80 00 00 3E 80 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "0D",
          "desc": "13 payload bytes; total frame length 16.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Frequency · Hz",
          "bytes": "46 FA 00 00",
          "desc": "Frequency · Hz",
          "type": "data"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 12 02 46 FA 00 00 3F 80 00 00 3E 80 00 00 01 00 00 03 E8 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "12",
          "desc": "18 payload bytes; total frame length 21.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Frequency · Hz",
          "bytes": "46 FA 00 00",
          "desc": "Frequency · Hz",
          "type": "data"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "EOP",
          "bytes": "01",
          "desc": "EOP",
          "type": "option"
        },
        {
          "label": "Point Delay · µs",
          "bytes": "00 00 03 E8",
          "desc": "Point Delay · µs",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 12 02 48 43 50 00 3F 80 00 00 3E 80 00 00 02 00 00 00 01 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "12",
          "desc": "18 payload bytes; total frame length 21.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Frequency · Hz",
          "bytes": "48 43 50 00",
          "desc": "Frequency · Hz",
          "type": "data"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "EOP",
          "bytes": "02",
          "desc": "EOP",
          "type": "option"
        },
        {
          "label": "Phase Sync",
          "bytes": "00 00 00 01",
          "desc": "Phase Sync",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 16 03 44 7A 00 00 47 C3 50 00 41 20 00 00 01 3F 80 00 00 3E 80 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "16",
          "desc": "22 payload bytes; total frame length 25.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Start · Hz",
          "bytes": "44 7A 00 00",
          "desc": "Start · Hz",
          "type": "data"
        },
        {
          "label": "Stop · Hz",
          "bytes": "47 C3 50 00",
          "desc": "Stop · Hz",
          "type": "data"
        },
        {
          "label": "Count",
          "bytes": "41 20 00 00",
          "desc": "Count",
          "type": "data"
        },
        {
          "label": "Scale",
          "bytes": "01",
          "desc": "Scale",
          "type": "option"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 16 03 44 7A 00 00 47 C3 50 00 3F 80 00 00 01 3F 80 00 00 3E 80 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "16",
          "desc": "22 payload bytes; total frame length 25.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Start · Hz",
          "bytes": "44 7A 00 00",
          "desc": "Start · Hz",
          "type": "data"
        },
        {
          "label": "Stop · Hz",
          "bytes": "47 C3 50 00",
          "desc": "Stop · Hz",
          "type": "data"
        },
        {
          "label": "Count",
          "bytes": "3F 80 00 00",
          "desc": "Count",
          "type": "data"
        },
        {
          "label": "Scale",
          "bytes": "01",
          "desc": "Scale",
          "type": "option"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 06 05 01 3E 80 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "06",
          "desc": "6 payload bytes; total frame length 9.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "05",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Type",
          "bytes": "01",
          "desc": "Type",
          "type": "option"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 08 05 00 00 01 3E 80 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "08",
          "desc": "8 payload bytes; total frame length 11.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "05",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Row / ID",
          "bytes": "00 00",
          "desc": "Row / ID",
          "type": "data"
        },
        {
          "label": "Type",
          "bytes": "01",
          "desc": "Type",
          "type": "option"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 10 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "10",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 11 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "11",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 02 11 0A B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "11",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Average count",
          "bytes": "0A",
          "desc": "Average count",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 12 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "12",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 13 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "13",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 14 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "14",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 15 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "15",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 06 16 01 42 C8 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "06",
          "desc": "6 payload bytes; total frame length 9.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "16",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Load type",
          "bytes": "01",
          "desc": "Load type",
          "type": "option"
        },
        {
          "label": "Load · Ω",
          "bytes": "42 C8 00 00",
          "desc": "Load · Ω",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 02 17 01 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "17",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Subfunction",
          "bytes": "01",
          "desc": "Subfunction",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 18 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "18",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 02 20 05 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "20",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Slot",
          "bytes": "05",
          "desc": "Slot",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 02 30 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "30",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "00",
          "desc": "Enable",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 32 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "32",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 05 33 3F 00 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "33",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "DC target · V",
          "bytes": "3F 00 00 00",
          "desc": "DC target · V",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 01 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 03 02 00 00 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Row",
          "bytes": "00 00",
          "desc": "Row",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 04 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "04",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 13 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "13",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 14 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "14",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 15 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "15",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 10 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "10",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 02 17 01 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "17",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Subfunction",
          "bytes": "01",
          "desc": "Subfunction",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 03 17 02 01 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "17",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Subfunction",
          "bytes": "02",
          "desc": "Subfunction",
          "type": "option"
        },
        {
          "label": "Channel",
          "bytes": "01",
          "desc": "Channel",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 02 20 05 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "20",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Slot",
          "bytes": "05",
          "desc": "Slot",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 33 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "33",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 31 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "31",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B0 0F 02 00 01 01 00 00 01 00 00 01 00 00 01 00 00 B0": [
        {
          "label": "CT · start",
          "bytes": "B0",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "0F",
          "desc": "15 payload bytes; total frame length 18.",
          "type": "length"
        },
        {
          "label": "Mode",
          "bytes": "02",
          "desc": "Mode",
          "type": "option"
        },
        {
          "label": "Current range",
          "bytes": "00",
          "desc": "Current range",
          "type": "option"
        },
        {
          "label": "Voltage range",
          "bytes": "01",
          "desc": "Voltage range",
          "type": "option"
        },
        {
          "label": "C port",
          "bytes": "01",
          "desc": "Main port",
          "type": "option"
        },
        {
          "label": "C channel",
          "bytes": "00 00",
          "desc": "Must be zero for main port",
          "type": "data"
        },
        {
          "label": "R port",
          "bytes": "01",
          "desc": "Main port",
          "type": "option"
        },
        {
          "label": "R channel",
          "bytes": "00 00",
          "desc": "Must be zero for main port",
          "type": "data"
        },
        {
          "label": "WS port",
          "bytes": "01",
          "desc": "Main port",
          "type": "option"
        },
        {
          "label": "WS channel",
          "bytes": "00 00",
          "desc": "Must be zero for main port",
          "type": "data"
        },
        {
          "label": "W port",
          "bytes": "01",
          "desc": "Main port",
          "type": "option"
        },
        {
          "label": "W channel",
          "bytes": "00 00",
          "desc": "Must be zero for main port",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B0",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B0 09 01 01 01 01 00 00 01 00 00 B0": [
        {
          "label": "CT · start",
          "bytes": "B0",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "09",
          "desc": "9 payload bytes; total frame length 12.",
          "type": "length"
        },
        {
          "label": "Mode",
          "bytes": "01",
          "desc": "Mode",
          "type": "option"
        },
        {
          "label": "Current range",
          "bytes": "01",
          "desc": "Current range",
          "type": "option"
        },
        {
          "label": "Voltage range",
          "bytes": "01",
          "desc": "Voltage range",
          "type": "option"
        },
        {
          "label": "C port",
          "bytes": "01",
          "desc": "C port",
          "type": "option"
        },
        {
          "label": "C channel",
          "bytes": "00 00",
          "desc": "C channel",
          "type": "data"
        },
        {
          "label": "W port",
          "bytes": "01",
          "desc": "W port",
          "type": "option"
        },
        {
          "label": "W channel",
          "bytes": "00 00",
          "desc": "W channel",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B0",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B0 03 FF FF FF B0": [
        {
          "label": "CT · start",
          "bytes": "B0",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "Clear marker",
          "bytes": "FF FF FF",
          "desc": "Special clear-stack payload",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B0",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 03 01 00 01 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Spectra",
          "bytes": "00 01",
          "desc": "Spectra",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 03 01 00 00 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Spectra",
          "bytes": "00 00",
          "desc": "Spectra",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 01 00 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "00",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 01 02 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 0A 00 00 42 C8 00 00 C1 20 00 00 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "0A",
          "desc": "10 payload bytes; total frame length 13.",
          "type": "length"
        },
        {
          "label": "Frequency ID",
          "bytes": "00 00",
          "desc": "Frequency ID",
          "type": "data"
        },
        {
          "label": "Real · Ω",
          "bytes": "42 C8 00 00",
          "desc": "Real · Ω",
          "type": "data"
        },
        {
          "label": "Imaginary · Ω",
          "bytes": "C1 20 00 00",
          "desc": "Imaginary · Ω",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 10 00 00 00 00 0F 42 40 01 42 C8 00 00 C1 20 00 00 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "10",
          "desc": "16 payload bytes; total frame length 19.",
          "type": "length"
        },
        {
          "label": "Frequency ID",
          "bytes": "00 00",
          "desc": "Frequency ID",
          "type": "data"
        },
        {
          "label": "Timestamp · µs",
          "bytes": "00 00 0F 42 40",
          "desc": "5-byte big-endian timestamp: 1,000,000 µs",
          "type": "data"
        },
        {
          "label": "Current range",
          "bytes": "01",
          "desc": "±10 mA",
          "type": "option"
        },
        {
          "label": "Real · Ω",
          "bytes": "42 C8 00 00",
          "desc": "Real · Ω",
          "type": "data"
        },
        {
          "label": "Imaginary · Ω",
          "bytes": "C1 20 00 00",
          "desc": "Imaginary · Ω",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "D0 00 D0": [
        {
          "label": "CT · start",
          "bytes": "D0",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "D0",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "D0 06 01 05 00 3C 00 1D D0": [
        {
          "label": "CT · start",
          "bytes": "D0",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "06",
          "desc": "6 payload bytes; total frame length 9.",
          "type": "length"
        },
        {
          "label": "Internal",
          "bytes": "01 05",
          "desc": "Internal",
          "type": "data"
        },
        {
          "label": "Revision",
          "bytes": "00 3C",
          "desc": "Revision",
          "type": "data"
        },
        {
          "label": "Build",
          "bytes": "00 1D",
          "desc": "Build",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "D0",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ]
    },
    "concepts": {
      "phase": {
        "title": "Phase synchronization",
        "body": "Synchronizes consecutive frequency transitions 1→2 through N−1→N; the first frequency is unaffected. Supported from 100 kHz inclusive. Useful for resonant DUTs where switching transients matter. Below 100 kHz, activation returns NACK. Added acquisition time depends on signal state and cannot be expressed as a fixed delay.",
        "encoding": "B6 EOP 02 + uint32: 0=off (default), 1=on. Optional pair adds 5 payload bytes.",
        "source": "Manual v123 · pp. 119, 121"
      },
      "delay": {
        "title": "Point Delay / settling",
        "body": "At the current frequency: start excitation, wait for Point Delay, then acquire. This allows settling transients to decay before measurement. It is distinct from the pause between spectra.",
        "encoding": "B6 EOP 01 + uint32 in µs. Range 0–180000000 (180 s); default 0. Pair adds 5 bytes.",
        "source": "Manual v123 · pp. 119, 121"
      },
      "precision": {
        "title": "Precision and repeatability",
        "body": "The Precision setting trades acquisition speed for repeatability. Higher values can improve measurement stability by extending acquisition time. Absolute accuracy describes how close results are to a reference value. For absolute accuracy, see the instrument specifications.",
        "encoding": "Required float32, 4 bytes; 0–10, documented default 0. Required fields must still be transmitted.",
        "source": "Manual v123 · pp. 28, 36, 118–121"
      },
      "excitation": {
        "title": "Excitation type and peak amplitude",
        "body": "Voltage and current excitation are supported. Voltage amplitude: 10 mV–1 V peak, equivalent to 20 mVpp–2 Vpp for a symmetric sinusoid. Current amplitude: 100 µA–10 mA peak. Input measurement range is a separate setting.",
        "encoding": "B6 EOP 03 uses uint32: 1=voltage (default), 2=current. B6/05 uses a 1-byte type. C4 defaults to current and supports float32/float64 amplitude.",
        "source": "Manual v123 · B6 and C4 command reference"
      },
      "count": {
        "title": "Point count and frequency IDs",
        "body": "B6 count means measured points including both endpoints. Send a positive integer encoded as float32. Count=1 measures start only; stop and scale are ignored but remain in the frame. IDs and Row start at 0 across all blocks: single point 0, then 9-point block 1–9, then 3-point block 10–12.",
        "encoding": "EIS setup total ≤2048. EIT C4 uses uint16 count and a separate 128-frequency stack in v123.",
        "source": "Manual v123 · B6 and C4 command reference"
      },
      "stack": {
        "title": "Channel stack and routing",
        "body": "Each B0 configuration appends one frontend configuration. Clear first to replace the stack. At most 128 entries; overflow returns NACK. Channels are numbered from 1. Each channel complete spectrum is transmitted before moving to the next, in stack order.",
        "encoding": "Clear: B0 03 FF FF FF B0. Each electrode: 1-byte port + 2-byte extension channel; main port extension channel is 0.",
        "source": "Manual v123 · pp. 108–114, 132"
      },
      "range": {
        "title": "Input measurement ranges",
        "body": "Choose the measurement range independently from excitation amplitude. Four fixed current ranges: ±10 mA, ±100 µA, ±1 µA, ±10 nA; auto range is also available. Auto range can change per frequency point. Poor selection can cause clipping or a weak signal-to-noise ratio.",
        "encoding": "B0 current codes 00=auto, 01=±10mA, 02=±100µA, 04=±1µA, 06=±10nA. Voltage 01=±1V (default if omitted), 02=±90mV.",
        "source": "Manual v123 · pp. 109–110"
      },
      "stream": {
        "title": "Receive complete spectra and stop correctly",
        "body": "Receive all expected frequency IDs to complete a channel spectrum; count complete spectra per channel. Packets carry no channel identifier: track the 1-based frontend channel sequence and expected point count. Stop disables excitation and disconnects DUT immediately. ACK confirms measurement has stopped; previously acquired buffered data may arrive afterwards. Use a timeout appropriate to the configured sweep and treat partial spectra as incomplete.",
        "encoding": "Await ACK/NACK before next host command. Measurement data can interleave with command responses. Decode timestamp/range according to 97/98 readback. Both are off by default.",
        "source": "Manual v123 · pp. 102–103, 130–133"
      },
      "sync": {
        "title": "Sync Time between spectra",
        "body": "Wait after the last point of a spectrum and before the first of the next. Applies also between spectra on different channels. SyncOut is low during this waiting interval. It is separate from Point Delay before a point acquisition and Phase Sync during a frequency transition.",
        "encoding": "B9 + uint32 µs; 0–180000000, default 0. Read BA; persist with 90.",
        "source": "Manual v123 · pp. 133–134"
      }
    }
  },
  "eit": {
    "meta": {
      "manual": "EIT16 / EIT32 / EIT64 / EIT128 / EIT256",
      "revision": 47,
      "release": "2026-11-11"
    },
    "commands": {
      "18": {
        "code": "0x18",
        "name": "System messages",
        "group": "Protocol",
        "source": "Manual v47 · pp. 75–76",
        "description": "Device status, acknowledgements and communication errors.",
        "notes": "",
        "options": [
          {
            "code": "status",
            "title": "Status frame",
            "request": "Device → host: 18 01 [status] 18",
            "response": "—",
            "fields": [
              [
                "Status",
                "1",
                "uint8",
                "—",
                "01 malformed frame · 02 timeout · 04 boot complete · 11 TCP connection valid · 81 not executed · 82 unknown command · 83 acknowledged · 84 ready · 92 measurement data could not be sent",
                "—"
              ]
            ],
            "notes": "Route status messages separately from measurement data.",
            "examples": [
              {
                "title": "Successful command acknowledgement",
                "hex": "18 01 83 18",
                "why": "The status 83 acknowledges a command.",
                "received": true
              }
            ],
            "help": []
          }
        ]
      },
      "a1": {
        "code": "0xA1",
        "name": "Reset system",
        "group": "System",
        "source": "Manual v47 · p. 77",
        "description": "Restart the complete device.",
        "notes": "",
        "options": [
          {
            "code": "reset",
            "title": "Reset",
            "request": "A1 00 A1",
            "response": "ACK: 18 01 83 18; boot-ready and system-ready messages",
            "fields": [],
            "notes": "Reset clears temporary output options. Re-establish communication and setup after restart.",
            "examples": [
              {
                "title": "Restart device",
                "hex": "A1 00 A1",
                "why": "Restart command; distinguish ACK, boot-ready (04) and ready (84) status frames."
              }
            ],
            "help": []
          }
        ]
      },
      "bd": {
        "code": "0xBD",
        "name": "Set Ethernet configuration",
        "group": "Network",
        "source": "Manual v47 · pp. 90–91",
        "description": "Set static IPv4 address or DHCP mode.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Static IPv4",
            "request": "BD 05 01 [IPv4:4] BD",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "IPv4",
                "4",
                "4 × uint8",
                "octets",
                "Each 0–255",
                "0.0.0.0"
              ]
            ],
            "notes": "Static address applies only with DHCP disabled. Save settings for persistence; choose an address valid for your network.",
            "examples": [
              {
                "title": "Example static address",
                "hex": "BD 05 01 C0 A8 01 64 BD",
                "why": "Example address: 192.168.1.100. Substitute an available address on your network."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "DHCP mode",
            "request": "BD 02 03 [switch] BD",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "switch",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "1"
              ]
            ],
            "notes": "Reboot required to apply; save for persistence.",
            "examples": [
              {
                "title": "Enable DHCP",
                "hex": "BD 02 03 01 BD",
                "why": "Save the setting and restart the device with A1. Reconnect using the address assigned by your DHCP server."
              }
            ],
            "help": []
          }
        ]
      },
      "be": {
        "code": "0xBE",
        "name": "Get Ethernet configuration",
        "group": "Network",
        "source": "Manual v47 · pp. 91–93",
        "description": "Read actual IPv4 address, MAC address or DHCP mode.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "IPv4",
            "request": "BE 01 01 BE",
            "response": "BE 05 01 [IPv4:4] BE; then ACK: 18 01 83 18",
            "fields": [
              [
                "IPv4 (response)",
                "4",
                "4 × uint8",
                "—",
                "Actual allocated address",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read IPv4",
                "hex": "BE 01 01 BE",
                "why": "Data response precedes ACK."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "MAC",
            "request": "BE 01 02 BE",
            "response": "BE 07 02 [MAC:6] BE; then ACK: 18 01 83 18",
            "fields": [
              [
                "MAC (response)",
                "6",
                "6 × uint8",
                "—",
                "Hardware MAC address",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read MAC",
                "hex": "BE 01 02 BE",
                "why": "Data response precedes ACK."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "DHCP",
            "request": "BE 01 03 BE",
            "response": "BE 02 03 [DHCP:1] BE; then ACK: 18 01 83 18",
            "fields": [
              [
                "DHCP (response)",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read DHCP",
                "hex": "BE 01 03 BE",
                "why": "Data response precedes ACK."
              }
            ],
            "help": []
          }
        ]
      },
      "cf": {
        "code": "0xCF",
        "name": "TCP watchdog",
        "group": "Network",
        "source": "Manual v47 · pp. 100–101",
        "description": "Configure the interval for checking TCP client connectivity.",
        "notes": "",
        "options": [
          {
            "code": "interval",
            "title": "Watchdog interval",
            "request": "CF 05 00 [seconds:4] CF",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "seconds",
                "4",
                "uint32",
                "s",
                "1–600; step 1",
                "60"
              ]
            ],
            "notes": "The device checks the TCP connection by periodically sending status 11. If the send fails, the device returns its server socket to the listening state.",
            "examples": [
              {
                "title": "60-second watchdog",
                "hex": "CF 05 00 00 00 00 3C CF",
                "why": "Configure the device TCP connection watchdog."
              }
            ],
            "help": []
          }
        ]
      },
      "90": {
        "code": "0x90",
        "name": "Save settings",
        "group": "System",
        "source": "Manual v47 · p. 77",
        "description": "Save supported instrument settings in flash.",
        "notes": "",
        "options": [
          {
            "code": "save",
            "title": "Save settings",
            "request": "90 00 90",
            "response": "18 01 83 18 (ACK)",
            "fields": [],
            "notes": "Run while idle. Saves Ethernet settings, WLAN SSID, DHCP, auto-connect and static address settings, battery mode and LED automatic mode.",
            "examples": [
              {
                "title": "Save settings",
                "hex": "90 00 90",
                "why": "Run while idle. Saves Ethernet settings, WLAN SSID, DHCP, auto-connect and static address settings, battery mode and LED automatic mode.",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "b0": {
        "code": "0xB0",
        "name": "Set measurement setup",
        "group": "Measurement",
        "source": "Manual v47 · pp. 78–83",
        "description": "Configure timing, frequency blocks, excitation, measurement mode, gain and input range.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Reset measurement setup",
            "request": "B0 01 01 B0",
            "response": "18 01 83 18 (ACK)",
            "fields": [],
            "notes": "Clears excitation frequencies and the injection sequence. Configure both again before starting a measurement.",
            "examples": [
              {
                "title": "Reset measurement setup",
                "hex": "B0 01 01 B0",
                "why": "Clears excitation frequencies and the injection sequence. Configure both again before starting a measurement.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Burst count",
            "request": "B0 03 02 [count:2] B0",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Frames",
                "2",
                "uint16",
                "frames",
                "0=continuous · 1–65,535=finite",
                "0"
              ]
            ],
            "notes": "Count full EIT frames.",
            "examples": [
              {
                "title": "Burst count",
                "hex": "B0 03 02 00 01 B0",
                "why": "Count full EIT frames.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Frame rate",
            "request": "B0 05 03 [rate:4] B0",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Frame rate",
                "4",
                "float32",
                "frames/s",
                "0.1–100",
                "1"
              ]
            ],
            "notes": "The achievable rate depends on channels, frequencies and the excitation sequence.",
            "examples": [
              {
                "title": "Frame rate",
                "hex": "B0 05 03 3F 80 00 00 B0",
                "why": "The achievable rate depends on channels, frequencies and the excitation sequence.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "Add frequency block",
            "request": "B0 0C 04 [start:4] [stop:4] [count:2] [scale] B0",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Start / stop frequency",
                "4",
                "float32 each",
                "Hz",
                "100–10,000,000",
                "100,000 at startup"
              ],
              [
                "Count",
                "2",
                "uint16",
                "points",
                "1–128, with at most 128 across blocks",
                "1 at startup"
              ],
              [
                "Scale",
                "1",
                "uint8",
                "—",
                "00=linear · 01=logarithmic",
                "00"
              ]
            ],
            "notes": "Append in transmission order. B0/01 clears all frequency blocks, so add a block before starting.",
            "examples": [
              {
                "title": "Add frequency block",
                "hex": "B0 0C 04 47 C3 50 00 47 C3 50 00 00 01 00 B0",
                "why": "Append in transmission order. B0/01 clears all frequency blocks, so add a block before starting.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "05",
            "title": "Excitation current",
            "request": "B0 05 05 [amp:4] B0 or B0 09 05 [amp:8] B0",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Current amplitude",
                "4 or 8",
                "float32 or float64",
                "A",
                "100 nA–10 mA",
                "0.01 A"
              ]
            ],
            "notes": "Choose the amplitude for your setup.",
            "examples": [
              {
                "title": "Set current using float32",
                "hex": "B0 05 05 3A 83 12 6F B0",
                "why": "1 mA excitation current.",
                "received": false
              },
              {
                "title": "Set current using float64",
                "hex": "B0 09 05 3F 50 62 4D D2 F1 A9 FC B0",
                "why": "1 mA excitation current.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "06",
            "title": "Add excitation pair",
            "request": "B0 03 06 [output:1] [input:1] B0 or B0 05 06 [output:2] [input:2] B0",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Excitation output / input",
                "1 or 2",
                "uint8 or uint16 each",
                "electrode",
                "00 disables the corresponding side",
                "—"
              ]
            ],
            "notes": "The two-byte addressing form uses LE=05. Append one pair per request, up to 256. Reset the setup to clear the sequence.",
            "examples": [
              {
                "title": "Add excitation pair",
                "hex": "B0 03 06 01 02 B0",
                "why": "The two-byte addressing form uses LE=05. Append one pair per request, up to 256. Reset the setup to clear the sequence.",
                "received": false
              },
              {
                "title": "Address electrodes above 255",
                "hex": "B0 05 06 01 00 00 01 B0",
                "why": "Use two bytes per electrode to address EIT256 electrode 256.",
                "received": false,
                "models": [
                  "eit256"
                ]
              }
            ],
            "help": []
          },
          {
            "code": "08",
            "title": "Measurement mode",
            "request": "B0 03 08 [mode] [boundary] B0",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Mode",
                "1",
                "uint8",
                "—",
                "01=single-ended · 02=differential skip 0 · 03=skip 2 · 04=skip 4",
                "01"
              ],
              [
                "Boundary",
                "1",
                "uint8",
                "—",
                "01=within 16-channel groups · 02=across groups (multiple groups required)",
                "—"
              ]
            ],
            "notes": "The boundary applies to differential mode. EIT16 uses an internal boundary. EIT32, EIT64 and EIT128 support circular differential arrangements within 16 channels or across the full instrument. Use single-ended mode for other arrangements.",
            "examples": [
              {
                "title": "Measurement mode",
                "hex": "B0 03 08 01 01 B0",
                "why": "The boundary applies to differential mode. EIT16 uses an internal boundary. EIT32, EIT64 and EIT128 support circular differential arrangements within 16 channels or across the full instrument. Use single-ended mode for other arrangements.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "09",
            "title": "Global gain",
            "request": "B0 03 09 [mode] [gain] B0",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Mode",
                "1",
                "uint8",
                "—",
                "01=global gain",
                "01"
              ],
              [
                "Gain code",
                "1",
                "uint8",
                "—",
                "00=×1 · 01=×10 · 02=×100 · 03=×1000",
                "00"
              ]
            ],
            "notes": "Resetting the setup restores ×1 gain.",
            "examples": [
              {
                "title": "Global gain",
                "hex": "B0 03 09 01 00 B0",
                "why": "Resetting the setup restores ×1 gain.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "0C",
            "title": "Excitation switch",
            "request": "B0 02 0C [type] B0",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Switch type",
                "1",
                "uint8",
                "—",
                "01=reed relay · 02=semiconductor",
                "01"
              ]
            ],
            "notes": "Semiconductor switches can improve frame rate at the cost of higher series impedance.",
            "examples": [
              {
                "title": "Excitation switch",
                "hex": "B0 02 0C 01 B0",
                "why": "Semiconductor switches can improve frame rate at the cost of higher series impedance.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "0D",
            "title": "ADC range",
            "request": "B0 02 0D [range] B0",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Range code",
                "1",
                "uint8",
                "V",
                "01=±1 · 02=±5 · 03=±10",
                "02 for battery systems, 03 otherwise"
              ]
            ],
            "notes": "Applies to all channels. ±10 V is unavailable on battery systems.",
            "examples": [
              {
                "title": "ADC range",
                "hex": "B0 02 0D 02 B0",
                "why": "Applies to all channels. ±10 V is unavailable on battery systems.",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "b1": {
        "code": "0xB1",
        "name": "Get measurement setup",
        "group": "Measurement",
        "source": "Manual v47 · pp. 83–87",
        "description": "Read active acquisition settings.",
        "notes": "",
        "options": [
          {
            "code": "02",
            "title": "Read burst count",
            "request": "B1 01 02 B1",
            "response": "B1 03 02 [count:2] B1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Frames",
                "2",
                "uint16",
                "frames",
                "0=continuous · 1–65,535=finite",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read burst count",
                "hex": "B1 01 02 B1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Read frame rate",
            "request": "B1 01 03 B1",
            "response": "B1 05 03 [rate:4] B1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Frame rate",
                "4",
                "float32",
                "frames/s",
                "0.1–100",
                "1"
              ]
            ],
            "notes": "The returned rate can differ from the requested rate.",
            "examples": [
              {
                "title": "Read frame rate",
                "hex": "B1 01 03 B1",
                "why": "The returned rate can differ from the requested rate.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "Read add frequency block",
            "request": "B1 01 04 B1",
            "response": "B1 [LE] 04 [repeated start:4, stop:4, count:2, scale:1] B1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Start / stop frequency",
                "4",
                "float32 each",
                "Hz",
                "100–10,000,000",
                "100,000 at startup"
              ],
              [
                "Count",
                "2",
                "uint16",
                "points",
                "1–128, with at most 128 across blocks",
                "1 at startup"
              ],
              [
                "Scale",
                "1",
                "uint8",
                "—",
                "00=linear · 01=logarithmic",
                "00"
              ]
            ],
            "notes": "Each block occupies 11 bytes. Use the returned length to delimit a response. The manual does not define fragmentation for lists exceeding one payload.",
            "examples": [
              {
                "title": "Read add frequency block",
                "hex": "B1 01 04 B1",
                "why": "Each block occupies 11 bytes. Use the returned length to delimit a response. The manual does not define fragmentation for lists exceeding one payload.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "05",
            "title": "Read excitation current",
            "request": "B1 01 05 B1",
            "response": "B1 05 05 [amp:4] B1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Current amplitude",
                "4",
                "float32",
                "A",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read excitation current",
                "hex": "B1 01 05 B1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "06",
            "title": "Read add excitation pair",
            "request": "B1 01 06 B1",
            "response": "B1 [LE] 06 [repeated output:2, input:2] B1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Output / input",
                "2",
                "uint16 each",
                "electrode",
                "Repeated pairs in stack order",
                "—"
              ]
            ],
            "notes": "The response uses two bytes per electrode and four bytes per pair. The manual does not define fragmentation for sequences exceeding one payload.",
            "examples": [
              {
                "title": "Read add excitation pair",
                "hex": "B1 01 06 B1",
                "why": "The response uses two bytes per electrode and four bytes per pair. The manual does not define fragmentation for sequences exceeding one payload.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "08",
            "title": "Read measurement mode",
            "request": "B1 01 08 B1",
            "response": "B1 03 08 [mode] [boundary] B1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Mode",
                "1",
                "uint8",
                "—",
                "01=single-ended · 02=differential skip 0 · 03=skip 2 · 04=skip 4",
                "01"
              ],
              [
                "Boundary",
                "1",
                "uint8",
                "—",
                "01=within 16-channel groups · 02=across groups (multiple groups required)",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read measurement mode",
                "hex": "B1 01 08 B1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "09",
            "title": "Read global gain",
            "request": "B1 01 09 B1",
            "response": "B1 03 09 [mode] [gain] B1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Mode",
                "1",
                "uint8",
                "—",
                "01=global gain",
                "01"
              ],
              [
                "Gain code",
                "1",
                "uint8",
                "—",
                "00=×1 · 01=×10 · 02=×100 · 03=×1000",
                "00"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read global gain",
                "hex": "B1 01 09 B1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "0C",
            "title": "Read excitation switch",
            "request": "B1 01 0C B1",
            "response": "B1 02 0C [type] B1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Switch type",
                "1",
                "uint8",
                "—",
                "01=reed relay · 02=semiconductor",
                "01"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read excitation switch",
                "hex": "B1 01 0C B1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "0D",
            "title": "Read adc range",
            "request": "B1 01 0D B1",
            "response": "B1 02 0D [range] B1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Range code",
                "1",
                "uint8",
                "V",
                "01=±1 · 02=±5 · 03=±10",
                "02 for battery systems, 03 otherwise"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read adc range",
                "hex": "B1 01 0D B1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "b2": {
        "code": "0xB2",
        "name": "Set output configuration",
        "group": "Measurement",
        "source": "Manual v47 · pp. 87–89",
        "description": "Configure optional measurement metadata while idle.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Enable excitation pair",
            "request": "B2 02 01 [enable] B2",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Enable",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "00"
              ]
            ],
            "notes": "Excitation pair adds 2 bytes or 4 on EIT256 to measurement frames when enabled. Default is off.",
            "examples": [
              {
                "title": "Enable excitation pair",
                "hex": "B2 02 01 01 B2",
                "why": "Excitation pair adds 2 bytes or 4 on EIT256 to measurement frames when enabled. Default is off.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Enable frequency row",
            "request": "B2 02 02 [enable] B2",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Enable",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "00"
              ]
            ],
            "notes": "Frequency row adds 2 bytes to measurement frames when enabled. Default is off.",
            "examples": [
              {
                "title": "Enable frequency row",
                "hex": "B2 02 02 01 B2",
                "why": "Frequency row adds 2 bytes to measurement frames when enabled. Default is off.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Enable timestamp",
            "request": "B2 02 03 [enable] B2",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Enable",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "00"
              ]
            ],
            "notes": "Timestamp adds 4 bytes to measurement frames when enabled. Default is off.",
            "examples": [
              {
                "title": "Enable timestamp",
                "hex": "B2 02 03 01 B2",
                "why": "Timestamp adds 4 bytes to measurement frames when enabled. Default is off.",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "b3": {
        "code": "0xB3",
        "name": "Get output configuration",
        "group": "Measurement",
        "source": "Manual v47 · pp. 87–89",
        "description": "Read the optional fields present in the measurement stream.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Read excitation pair",
            "request": "B3 01 01 B3",
            "response": "B3 02 01 [enabled] B3 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Enable",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "00"
              ]
            ],
            "notes": "Excitation pair adds 2 bytes or 4 on EIT256 to measurement frames when enabled. Default is off.",
            "examples": [
              {
                "title": "Read excitation pair",
                "hex": "B3 01 01 B3",
                "why": "Excitation pair adds 2 bytes or 4 on EIT256 to measurement frames when enabled. Default is off.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Read frequency row",
            "request": "B3 01 02 B3",
            "response": "B3 02 02 [enabled] B3 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Enable",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "00"
              ]
            ],
            "notes": "Frequency row adds 2 bytes to measurement frames when enabled. Default is off.",
            "examples": [
              {
                "title": "Read frequency row",
                "hex": "B3 01 02 B3",
                "why": "Frequency row adds 2 bytes to measurement frames when enabled. Default is off.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Read timestamp",
            "request": "B3 01 03 B3",
            "response": "B3 02 03 [enabled] B3 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Enable",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "00"
              ]
            ],
            "notes": "Timestamp adds 4 bytes to measurement frames when enabled. Default is off.",
            "examples": [
              {
                "title": "Read timestamp",
                "hex": "B3 01 03 B3",
                "why": "Timestamp adds 4 bytes to measurement frames when enabled. Default is off.",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "b4": {
        "code": "0xB4",
        "name": "Start / stop and measurement data",
        "group": "Measurement",
        "source": "Manual v47 · pp. 89–90, 106–107",
        "description": "Control acquisition and interpret the stream of complex electrode voltages.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Start acquisition",
            "request": "B4 01 01 B4",
            "response": "18 01 83 18 (ACK)",
            "fields": [],
            "notes": "Start when idle with a configured frequency stack and excitation sequence. A positive burst count ends acquisition automatically.",
            "examples": [
              {
                "title": "Start acquisition",
                "hex": "B4 01 01 B4",
                "why": "Start when idle with a configured frequency stack and excitation sequence. A positive burst count ends acquisition automatically.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "00",
            "title": "Stop acquisition",
            "request": "B4 01 00 B4",
            "response": "18 01 83 18 (ACK)",
            "fields": [],
            "notes": "",
            "examples": [
              {
                "title": "Stop acquisition",
                "hex": "B4 01 00 B4",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "data",
            "title": "EIT group data",
            "request": "Device → host: B4 [LE] [group] [excitation pair?] [frequency row?] [timestamp?] [16 complex voltages] B4",
            "response": "Streamed during acquisition",
            "fields": [
              [
                "Channel group",
                "1",
                "uint8",
                "group",
                "1-based. Group 1 contains channels 1–16, group 2 channels 17–32, and so on.",
                "—"
              ],
              [
                "Excitation output / input (optional)",
                "2 or 4",
                "uint8 or uint16 pair",
                "electrode",
                "Two bytes per electrode on EIT256.",
                "—"
              ],
              [
                "Frequency row (optional)",
                "2",
                "uint16",
                "row",
                "—",
                "—"
              ],
              [
                "Timestamp (optional)",
                "4",
                "uint32",
                "ms",
                "Elapsed time since measurement began",
                "—"
              ],
              [
                "Voltage (per channel)",
                "8",
                "2 × float32",
                "V",
                "Real then imaginary. 16 complex voltages per group packet.",
                "—"
              ]
            ],
            "notes": "LE includes the group byte and 128 voltage bytes plus any optional fields. LE=81 with metadata off. With all options enabled LE=89, or LE=8B on EIT256. Assemble groups using the acquisition setup and the optional identifiers. Status 92 indicates a transfer holdup, and acquisition pauses.",
            "examples": [
              {
                "title": "Example group packet",
                "hex": "B4 89 01 01 02 00 01 00 00 01 23 3F 80 00 00 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 B4",
                "why": "Group 1, electrodes 1 and 2, frequency row 1, timestamp 291 ms and 16 complex voltages. Channel 1 is 1 + j2 V. This example uses one-byte electrode IDs.",
                "received": true,
                "models": [
                  "eit16",
                  "eit32",
                  "eit64",
                  "eit128"
                ]
              },
              {
                "title": "EIT256 group packet",
                "hex": "B4 8B 01 01 00 00 01 00 01 00 00 01 23 3F 80 00 00 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 B4",
                "why": "Group 1, injection from electrode 256 to electrode 1. Two bytes are used for each electrode ID.",
                "received": true,
                "models": [
                  "eit256"
                ]
              }
            ],
            "help": []
          }
        ]
      },
      "b5": {
        "code": "0xB5",
        "name": "Read temperature",
        "group": "Hardware",
        "source": "Manual v47 · p. 90",
        "description": "Read a controller or frontend temperature sensor.",
        "notes": "",
        "options": [
          {
            "code": "00",
            "title": "Controller temperature",
            "request": "B5 01 00 B5",
            "response": "B5 05 00 [temperature:4] B5 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Temperature",
                "4",
                "float32",
                "°C",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Controller temperature",
                "hex": "B5 01 00 B5",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "01",
            "title": "Frontend temperature",
            "request": "B5 01 01 B5",
            "response": "B5 05 01 [temperature:4] B5 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Temperature",
                "4",
                "float32",
                "°C",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Frontend temperature",
                "hex": "B5 01 01 B5",
                "why": "",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "c6": {
        "code": "0xC6",
        "name": "Set battery control",
        "group": "Battery",
        "source": "Manual v47 · p. 93",
        "description": "Configure or read battery settings on battery-equipped models.",
        "notes": "",
        "options": [
          {
            "code": "02",
            "title": "Measure on battery",
            "request": "C6 02 02 [enabled] C6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "enabled",
                "1",
                "uint8",
                "—",
                "0=disable; 1=enable",
                "—"
              ]
            ],
            "notes": "Battery module required.",
            "examples": [
              {
                "title": "Enable battery operation",
                "hex": "C6 02 02 01 C6",
                "why": "Battery module required.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Minimum remaining capacity",
            "request": "C6 02 03 [remaining capacity %] C6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "percent",
                "1",
                "uint8",
                "%",
                "0–100 (supported values depend on battery configuration)",
                "—"
              ]
            ],
            "notes": "The instrument switches to external power at the configured threshold and stops the measurement.",
            "examples": [
              {
                "title": "10% switchover threshold",
                "hex": "C6 02 03 0A C6",
                "why": "Battery module required.",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "c7": {
        "code": "0xC7",
        "name": "Get battery control",
        "group": "Battery",
        "source": "Manual v47 · pp. 94–95",
        "description": "Configure or read battery settings on battery-equipped models.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Status and capacity",
            "request": "C7 01 01 C7",
            "response": "C7 03 01 [status] [capacity] C7; then ACK: 18 01 83 18",
            "fields": [
              [
                "status",
                "1",
                "bitmask",
                "—",
                "Bit 1: power source (1=battery, 0=external). Bit 0: charging.",
                "—"
              ],
              [
                "capacity",
                "1",
                "uint8",
                "%",
                "0–100",
                "—"
              ]
            ],
            "notes": "Battery module required.",
            "examples": [
              {
                "title": "Read battery status",
                "hex": "C7 01 01 C7",
                "why": "Battery module required.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Battery measurement flag",
            "request": "C7 01 02 C7",
            "response": "C7 02 02 [enabled] C7; then ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "—"
              ]
            ],
            "notes": "Battery module required.",
            "examples": [
              {
                "title": "Read battery selection",
                "hex": "C7 01 02 C7",
                "why": "Battery module required.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Minimum capacity",
            "request": "C7 01 03 C7",
            "response": "C7 02 03 [percent] C7; then ACK: 18 01 83 18",
            "fields": [
              [
                "percent",
                "1",
                "uint8",
                "%",
                "0–100 (supported values depend on battery configuration)",
                "—"
              ]
            ],
            "notes": "The instrument switches to external power at the configured threshold and stops the measurement.",
            "examples": [
              {
                "title": "Read threshold",
                "hex": "C7 01 03 C7",
                "why": "Battery module required.",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "c1": {
        "code": "0xC1",
        "name": "Set low-side switch",
        "group": "Hardware",
        "source": "Manual v47 · pp. 93–94",
        "description": "Enable or disable the low-side switch.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Disable the switch",
            "request": "C1 02 01 [enable] C1",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Enable",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Disable the switch",
                "hex": "C1 02 01 00 C1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "c8": {
        "code": "0xC8",
        "name": "Set LED control",
        "group": "Hardware",
        "source": "Manual v47 · pp. 95–97",
        "description": "Configure or inspect an LED operating mode.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Automatic mode",
            "request": "C8 03 01 [LED] [setting] C8",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "LED",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "Setting",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Automatic mode",
                "hex": "C8 03 01 01 01 C8",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Manual LED state",
            "request": "C8 03 02 [LED] [setting] C8",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "LED",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "Setting",
                "1",
                "uint8",
                "—",
                "00=off · 01=on · 02=blink",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Manual LED state",
                "hex": "C8 03 02 01 01 C8",
                "why": "",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "c9": {
        "code": "0xC9",
        "name": "Get LED control",
        "group": "Hardware",
        "source": "Manual v47 · pp. 95–97",
        "description": "Configure or inspect an LED operating mode.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Automatic mode",
            "request": "C9 02 01 01 C9",
            "response": "C9 03 01 [LED] [setting] C9 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "LED",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "Setting",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Automatic mode",
                "hex": "C9 02 01 01 C9",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Manual LED state",
            "request": "C9 02 02 01 C9",
            "response": "C9 03 02 [LED] [setting] C9 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "LED",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "Setting",
                "1",
                "uint8",
                "—",
                "00=off · 01=on · 02=blink",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Manual LED state",
                "hex": "C9 02 02 01 C9",
                "why": "",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "cb": {
        "code": "0xCB",
        "name": "Front IO",
        "group": "Hardware",
        "source": "Manual v47 · pp. 97–99",
        "description": "Configure direction and state on instruments with optional front IO.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Set IO direction",
            "request": "CB 04 01 [group] [IO] [direction] CB",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Group",
                "1",
                "uint8",
                "group",
                "1-based groups of 16 channels",
                "—"
              ],
              [
                "IO number",
                "1",
                "uint8",
                "—",
                "1–4 per group",
                "—"
              ],
              [
                "Direction",
                "1",
                "uint8",
                "—",
                "00=input · 01=output",
                "00"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set IO direction",
                "hex": "CB 04 01 01 01 01 CB",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Set output state",
            "request": "CB 04 02 [group] [IO] [level] CB",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Group",
                "1",
                "uint8",
                "group",
                "1-based groups of 16 channels",
                "—"
              ],
              [
                "IO number",
                "1",
                "uint8",
                "—",
                "1–4 per group",
                "—"
              ],
              [
                "Level",
                "1",
                "uint8",
                "—",
                "00=low · 01=high",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set output state",
                "hex": "CB 04 02 01 01 00 CB",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "81",
            "title": "Read IO direction",
            "request": "CB 03 81 [group] [IO] CB",
            "response": "CB [LE] 81 [group] [IO] [direction] CB → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Group",
                "1",
                "uint8",
                "group",
                "1-based groups of 16 channels",
                "—"
              ],
              [
                "IO number",
                "1",
                "uint8",
                "—",
                "1–4 per group",
                "—"
              ],
              [
                "Direction",
                "1",
                "uint8",
                "—",
                "00=input · 01=output",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read IO direction",
                "hex": "CB 03 81 01 01 CB",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "82",
            "title": "Read group IO states",
            "request": "CB 02 82 [group] CB",
            "response": "CB 03 82 [group] [states] CB → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Group",
                "1",
                "uint8",
                "group",
                "1-based groups of 16 channels",
                "—"
              ],
              [
                "States",
                "1",
                "bit field",
                "—",
                "Logic states for the selected group",
                "—"
              ]
            ],
            "notes": "Omit the IO number to read all four states together.",
            "examples": [
              {
                "title": "Read group IO states",
                "hex": "CB 02 82 01 CB",
                "why": "Omit the IO number to read all four states together.",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "cc": {
        "code": "0xCC",
        "name": "Detect DC power plug",
        "group": "Battery",
        "source": "Manual v47 · p. 99",
        "description": "Read whether the DC plug is inserted.",
        "notes": "",
        "options": [
          {
            "code": "81",
            "title": "Read plug status",
            "request": "CC 01 81 CC",
            "response": "CC 02 81 [state] CC → 18 01 83 18 (ACK)",
            "fields": [
              [
                "State",
                "1",
                "uint8",
                "—",
                "00=absent · 01=inserted",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read plug status",
                "hex": "CC 01 81 CC",
                "why": "",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "ce": {
        "code": "0xCE",
        "name": "LTC timestamp output",
        "group": "Measurement",
        "source": "Manual v47 · pp. 99–100",
        "description": "Configure LTC records in the data stream.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Send LTC every EIT frame",
            "request": "CE 03 01 [interval:2] CE",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Interval",
                "2",
                "uint16",
                "EIT frames",
                "0=disabled · 1–65,535=one record every N frames",
                "—"
              ]
            ],
            "notes": "The first record precedes the first data frame.",
            "examples": [
              {
                "title": "Send LTC every EIT frame",
                "hex": "CE 03 01 00 01 CE",
                "why": "The first record precedes the first data frame.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "data",
            "title": "LTC record",
            "request": "Device → host: CE 0F 01 [LTC:10] [timestamp:4] CE",
            "response": "Streamed during acquisition",
            "fields": [
              [
                "LTC",
                "10",
                "80-bit record",
                "—",
                "Ends with sync word 3FFD",
                "—"
              ],
              [
                "Timestamp",
                "4",
                "uint32",
                "—",
                "Internal timestamp valid during acquisition",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Example LTC record",
                "hex": "CE 0F 01 C0 00 60 00 90 40 80 00 3F FD 00 00 00 00 CE",
                "why": "Ten bytes of LTC followed by four internal timestamp bytes.",
                "received": true
              }
            ],
            "help": []
          }
        ]
      },
      "d1": {
        "code": "0xD1",
        "name": "Read device information",
        "group": "System",
        "source": "Manual v47 · p. 101",
        "description": "Identify the instrument and installed options.",
        "notes": "",
        "options": [
          {
            "code": "info",
            "title": "Read device information",
            "request": "D1 00 D1",
            "response": "D1 [LE] [device information] D1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Serial-number version",
                "1",
                "uint8",
                "—",
                "01",
                "—"
              ],
              [
                "Device identifier",
                "2",
                "uint16",
                "—",
                "0019=EIT",
                "—"
              ],
              [
                "Serial number",
                "2",
                "uint16",
                "—",
                "—",
                "—"
              ],
              [
                "Manufacture date",
                "2",
                "uint8 pair",
                "—",
                "Year relative to 2010, then month 1–12",
                "—"
              ],
              [
                "Specific data version",
                "1",
                "uint8",
                "—",
                "03 in this layout",
                "—"
              ],
              [
                "Options",
                "2",
                "bit field",
                "—",
                "Bit 0 battery · bit 1 Wi-Fi · bit 2 IsoIO",
                "—"
              ],
              [
                "Board IDs",
                "variable",
                "uint16 each",
                "—",
                "Controller, frontend/connector pairs and additional module IDs",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read device information",
                "hex": "D1 00 D1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "d2": {
        "code": "0xD2",
        "name": "Read firmware versions",
        "group": "System",
        "source": "Manual v47 · pp. 101–102",
        "description": "Read ARM and FPGA revisions and build numbers from one or more hardware modules.",
        "notes": "",
        "options": [
          {
            "code": "versions",
            "title": "Read firmware versions",
            "request": "D2 00 D2",
            "response": "D2 [LE] [15-byte version record]… D2 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "ARM reserved",
                "2",
                "bytes",
                "—",
                "—",
                "—"
              ],
              [
                "ARM revision / build",
                "2",
                "uint16 each",
                "—",
                "—",
                "—"
              ],
              [
                "FPGA reserved",
                "5",
                "bytes",
                "—",
                "—",
                "—"
              ],
              [
                "FPGA revision / build",
                "2",
                "uint16 each",
                "—",
                "—",
                "—"
              ]
            ],
            "notes": "The manual lists one module record for EIT16/32, two for EIT64 and four for EIT128. Use LE to delimit the response. The EIT256 record count is not specified.",
            "examples": [
              {
                "title": "Read firmware versions",
                "hex": "D2 00 D2",
                "why": "The manual lists one module record for EIT16/32, two for EIT64 and four for EIT128. Use LE to delimit the response. The EIT256 record count is not specified.",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "f1": {
        "code": "0xF1",
        "name": "WLAN configuration",
        "group": "Network",
        "source": "Manual v47 · pp. 102–106",
        "description": "Configure Wi-Fi on an instrument fitted with the WLAN module.",
        "notes": "Use 90 to persist supported WLAN settings.",
        "options": [
          {
            "code": "00",
            "title": "Set connection",
            "request": "F1 02 00 [switch] F1",
            "response": "F1 02 80 [status] F1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Switch",
                "1",
                "uint8",
                "—",
                "00=disconnect · 01=connect",
                "—"
              ]
            ],
            "notes": "A connection attempt can take up to ten seconds.",
            "examples": [
              {
                "title": "Set connection",
                "hex": "F1 02 00 00 F1",
                "why": "A connection attempt can take up to ten seconds.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "80",
            "title": "Read connection",
            "request": "F1 01 80 F1",
            "response": "F1 02 80 [status] F1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Switch",
                "1",
                "uint8",
                "—",
                "00=disconnect · 01=connect",
                "—"
              ]
            ],
            "notes": "A connection attempt can take up to ten seconds.",
            "examples": [
              {
                "title": "Read connection",
                "hex": "F1 01 80 F1",
                "why": "A connection attempt can take up to ten seconds.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "01",
            "title": "Set SSID",
            "request": "F1 [LE] 01 [SSID] F1",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "SSID",
                "1–32",
                "ASCII",
                "—",
                "—",
                "—"
              ]
            ],
            "notes": "Use the network name in ASCII.",
            "examples": [
              {
                "title": "Set SSID",
                "hex": "F1 04 01 4C 61 62 F1",
                "why": "Use the network name in ASCII.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "81",
            "title": "Read SSID",
            "request": "F1 01 81 F1",
            "response": "F1 [LE] 81 [SSID] F1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "SSID",
                "1–32",
                "ASCII",
                "—",
                "—",
                "—"
              ]
            ],
            "notes": "Use the network name in ASCII.",
            "examples": [
              {
                "title": "Read SSID",
                "hex": "F1 01 81 F1",
                "why": "Use the network name in ASCII.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Set WLAN password",
            "request": "F1 [LE] 02 [password] F1",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Password",
                "1–63",
                "ASCII",
                "—",
                "—",
                "—"
              ]
            ],
            "notes": "The length is one option byte plus the password length. Use the credentials for your Wi-Fi network.",
            "examples": [],
            "help": []
          },
          {
            "code": "03",
            "title": "Set DHCP",
            "request": "F1 02 03 [switch] F1",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Enable",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set DHCP",
                "hex": "F1 02 03 01 F1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "83",
            "title": "Read DHCP",
            "request": "F1 01 83 F1",
            "response": "F1 02 83 [switch] F1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Enable",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read DHCP",
                "hex": "F1 01 83 F1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "Set static IPv4 item",
            "request": "F1 06 04 [item] [address:4] F1",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Item",
                "1",
                "uint8",
                "—",
                "01=IP address · 02=subnet mask · 03=gateway",
                "—"
              ],
              [
                "Address",
                "4",
                "uint8 octets",
                "—",
                "0–255 per octet",
                "255.255.255.255"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set static IPv4 item",
                "hex": "F1 06 04 01 C0 00 02 0A F1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "84",
            "title": "Read static IPv4 item",
            "request": "F1 02 84 01 F1",
            "response": "F1 06 84 [item] [address:4] F1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Item",
                "1",
                "uint8",
                "—",
                "01=IP address · 02=subnet mask · 03=gateway",
                "—"
              ],
              [
                "Address",
                "4",
                "uint8 octets",
                "—",
                "0–255 per octet",
                "255.255.255.255"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read static IPv4 item",
                "hex": "F1 02 84 01 F1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "05",
            "title": "Set socket port",
            "request": "F1 03 05 [port:2] F1",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Port",
                "2",
                "uint16",
                "—",
                "0–65,535",
                "65,535"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set socket port",
                "hex": "F1 03 05 13 88 F1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "85",
            "title": "Read socket port",
            "request": "F1 01 85 F1",
            "response": "F1 03 85 [port:2] F1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Port",
                "2",
                "uint16",
                "—",
                "0–65,535",
                "65,535"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read socket port",
                "hex": "F1 01 85 F1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "06",
            "title": "Set auto-connect",
            "request": "F1 02 06 [switch] F1",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Switch",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "00"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set auto-connect",
                "hex": "F1 02 06 01 F1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "86",
            "title": "Read auto-connect",
            "request": "F1 01 86 F1",
            "response": "F1 02 86 [switch] F1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Switch",
                "1",
                "uint8",
                "—",
                "00=off · 01=on",
                "00"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read auto-connect",
                "hex": "F1 01 86 F1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "87",
            "title": "Read signal strength",
            "request": "F1 01 87 F1",
            "response": "F1 02 87 [strength] F1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Strength",
                "1",
                "uint8",
                "%",
                "0–100",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read signal strength",
                "hex": "F1 01 87 F1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "88",
            "title": "Read assigned IP address",
            "request": "F1 01 88 F1",
            "response": "F1 05 88 [address:4] F1 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "IPv4 address",
                "4",
                "uint8 octets",
                "—",
                "Current network address",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read assigned IP address",
                "hex": "F1 01 88 F1",
                "why": "",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "ca": {
        "code": "0xCA",
        "name": "Configure IsoIOport",
        "group": "IO / NTC",
        "source": "Manual v47 · pp. 114–119",
        "description": "Assign isolated IO functions and exchange data with supported peripherals.",
        "notes": "Requires IsoIOport hardware. Use the dedicated pins for I²C.",
        "options": [
          {
            "code": "00",
            "title": "Set IO function",
            "request": "CA 04 00 [bank] [IO] [function] CA",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "IO",
                "1",
                "uint8",
                "—",
                "1–8 per bank",
                "—"
              ],
              [
                "Function",
                "1",
                "uint8",
                "—",
                "00 input · 01 output · 02 I²C SCL · 03 I²C SDA · 04 SPI SCLK · 05 SPI CS# · 06 SPI MOSI · 07 SPI MISO · 08 UART Tx · 09 UART Rx · 0A Sync Out · 0B Sync In",
                "—"
              ]
            ],
            "notes": "Use pins compatible with the electrical direction of their assigned function.",
            "examples": [
              {
                "title": "Set IO function",
                "hex": "CA 04 00 01 01 00 CA",
                "why": "Use pins compatible with the electrical direction of their assigned function.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "80",
            "title": "Read IO function",
            "request": "CA 03 80 [bank] [IO] CA",
            "response": "CA 04 80 [bank] [IO] [function] CA → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "IO",
                "1",
                "uint8",
                "—",
                "1–8 per bank",
                "—"
              ],
              [
                "Function",
                "1",
                "uint8",
                "—",
                "00 input · 01 output · 02 I²C SCL · 03 I²C SDA · 04 SPI SCLK · 05 SPI CS# · 06 SPI MOSI · 07 SPI MISO · 08 UART Tx · 09 UART Rx · 0A Sync Out · 0B Sync In",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read IO function",
                "hex": "CA 03 80 01 01 CA",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "01",
            "title": "Set UART Rx sink",
            "request": "CA 04 01 [bank] 04 [sink] CA",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Sink",
                "1",
                "uint8",
                "—",
                "00=high-speed USB · 01=full-speed USB",
                "01"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set UART Rx sink",
                "hex": "CA 04 01 01 04 01 CA",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "81",
            "title": "Read UART Rx sink",
            "request": "CA 03 81 [bank] 04 CA",
            "response": "CA 04 81 [bank] 04 [sink] CA → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Sink",
                "1",
                "uint8",
                "—",
                "00=high-speed USB · 01=full-speed USB",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read UART Rx sink",
                "hex": "CA 03 81 01 04 CA",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Transfer peripheral data",
            "request": "CA [LE] 02 [bank] [interface] [data] CA",
            "response": "CA [LE] 82 [bank] [interface] [data] (when read data is available) CA → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Interface",
                "1",
                "uint8",
                "—",
                "00=IO state · 01=output register · 02=I²C · 03=SPI master · 04=UART",
                "—"
              ],
              [
                "Register data",
                "1",
                "bit field",
                "—",
                "MSB first from IO1 through IO8. State register is read-only.",
                "—"
              ],
              [
                "I²C data",
                "variable",
                "bytes",
                "—",
                "Address + R/W bit, TX count, TX bytes, optional RX count. TX/RX counts 0–15. A read returns the received bytes.",
                "—"
              ],
              [
                "SPI data",
                "variable",
                "bytes",
                "—",
                "RX count followed by TX bytes. A successful read returns received bytes. Up to 200 data bytes.",
                "—"
              ],
              [
                "UART data",
                "variable",
                "bytes",
                "—",
                "TX/RX bytes, up to 200. RX can arrive asynchronously.",
                "—"
              ]
            ],
            "notes": "I²C, SPI and UART operations use 02. Read replies and asynchronous UART data use option 82.",
            "examples": [
              {
                "title": "Transfer peripheral data",
                "hex": "CA 04 02 01 01 00 CA",
                "why": "I²C, SPI and UART operations use 02. Read replies and asynchronous UART data use option 82.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "82",
            "title": "Read IO register",
            "request": "CA 03 82 [bank] [interface] CA",
            "response": "CA [LE] 82 [bank] [interface] [data] CA → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Interface",
                "1",
                "uint8",
                "—",
                "00=IO state · 01=output register · 02=I²C · 03=SPI master · 04=UART",
                "—"
              ],
              [
                "Register data",
                "1",
                "bit field",
                "—",
                "MSB first from IO1 through IO8. State register is read-only.",
                "—"
              ]
            ],
            "notes": "Request 82 is available for the IO state and output registers.",
            "examples": [
              {
                "title": "Read IO register",
                "hex": "CA 03 82 01 00 CA",
                "why": "Request 82 is available for the IO state and output registers.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Set interface setting",
            "request": "CA [LE] 03 [bank] [interface] [setting] [value] CA",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Setting",
                "1",
                "uint8",
                "—",
                "SPI: 00 SCLK-rate divisor, 01 CPOL. UART: 00 baud-rate divisor, 01 parity.",
                "—"
              ],
              [
                "Value",
                "1 or 4",
                "uint8 or uint32",
                "—",
                "Clock and baud values are uint32 divisors of 115 MHz. CPOL: 0 idle low, 1 idle high. Parity: 0 none, 1 even, 2 odd.",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set interface setting",
                "hex": "CA 05 03 01 03 01 00 CA",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "83",
            "title": "Read interface setting",
            "request": "CA 04 83 [bank] [interface] [setting] CA",
            "response": "CA [LE] 83 [bank] [interface] [setting] [value] CA → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Setting",
                "1",
                "uint8",
                "—",
                "SPI: 00 SCLK-rate divisor, 01 CPOL. UART: 00 baud-rate divisor, 01 parity.",
                "—"
              ],
              [
                "Value",
                "1 or 4",
                "uint8 or uint32",
                "—",
                "Clock and baud values are uint32 divisors of 115 MHz. CPOL: 0 idle low, 1 idle high. Parity: 0 none, 1 even, 2 odd.",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read interface setting",
                "hex": "CA 04 83 01 03 01 CA",
                "why": "",
                "received": false
              }
            ],
            "help": []
          }
        ]
      }
    },
    "frames": {
      "18 01 83 18": [
        {
          "label": "Frame start",
          "bytes": "18",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Status",
          "bytes": "83",
          "desc": "Status",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "18",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "A1 00 A1": [
        {
          "label": "CT · start",
          "bytes": "A1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "A1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BD 05 01 C0 A8 01 64 BD": [
        {
          "label": "CT · start",
          "bytes": "BD",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "IPv4",
          "bytes": "C0 A8 01 64",
          "desc": "192.168.1.100, illustrative address.",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "BD",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BD 02 03 01 BD": [
        {
          "label": "CT · start",
          "bytes": "BD",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "DHCP",
          "bytes": "01",
          "desc": "DHCP",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BD",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BE 01 01 BE": [
        {
          "label": "CT · start",
          "bytes": "BE",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BE",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BE 01 02 BE": [
        {
          "label": "CT · start",
          "bytes": "BE",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BE",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BE 01 03 BE": [
        {
          "label": "CT · start",
          "bytes": "BE",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BE",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CF 05 00 00 00 00 3C CF": [
        {
          "label": "CT · start",
          "bytes": "CF",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "Subcommand",
          "bytes": "00",
          "desc": "Subcommand",
          "type": "option"
        },
        {
          "label": "Interval · s",
          "bytes": "00 00 00 3C",
          "desc": "Interval · s",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "CF",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "90 00 90": [
        {
          "label": "Frame start",
          "bytes": "90",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "00",
          "desc": "0 payload bytes",
          "type": "length"
        },
        {
          "label": "Frame end",
          "bytes": "90",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 01 01 B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 03 02 00 01 B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "02",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame count",
          "bytes": "00 01",
          "desc": "One complete acquisition",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 05 03 3F 80 00 00 B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "05",
          "desc": "5 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "03",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame rate",
          "bytes": "3F 80 00 00",
          "desc": "1 frames/s",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 0C 04 47 C3 50 00 47 C3 50 00 00 01 00 B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "0C",
          "desc": "12 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "04",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Start",
          "bytes": "47 C3 50 00",
          "desc": "100000 Hz",
          "type": "data"
        },
        {
          "label": "Stop",
          "bytes": "47 C3 50 00",
          "desc": "100000 Hz",
          "type": "data"
        },
        {
          "label": "Count",
          "bytes": "00 01",
          "desc": "Count",
          "type": "data"
        },
        {
          "label": "Scale",
          "bytes": "00",
          "desc": "Scale",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 03 06 01 02 B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "06",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Output electrode",
          "bytes": "01",
          "desc": "Output electrode",
          "type": "data"
        },
        {
          "label": "Input electrode",
          "bytes": "02",
          "desc": "Input electrode",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 05 06 01 00 00 01 B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "05",
          "desc": "5 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "06",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Output electrode",
          "bytes": "01 00",
          "desc": "Output electrode",
          "type": "data"
        },
        {
          "label": "Input electrode",
          "bytes": "00 01",
          "desc": "Input electrode",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 03 08 01 01 B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "08",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Mode",
          "bytes": "01",
          "desc": "Mode",
          "type": "data"
        },
        {
          "label": "Boundary",
          "bytes": "01",
          "desc": "Boundary",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 03 09 01 00 B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "09",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Mode",
          "bytes": "01",
          "desc": "Mode",
          "type": "data"
        },
        {
          "label": "Gain code",
          "bytes": "00",
          "desc": "Gain code",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 02 0C 01 B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "0C",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Switch type",
          "bytes": "01",
          "desc": "Switch type",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 02 0D 02 B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "0D",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Range code",
          "bytes": "02",
          "desc": "Range code",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 05 05 3A 83 12 6F B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "05",
          "desc": "5 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "05",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Current",
          "bytes": "3A 83 12 6F",
          "desc": "0.001 A",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B0 09 05 3F 50 62 4D D2 F1 A9 FC B0": [
        {
          "label": "Frame start",
          "bytes": "B0",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "09",
          "desc": "9 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "05",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Current",
          "bytes": "3F 50 62 4D D2 F1 A9 FC",
          "desc": "0.001 A",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B0",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B1 01 02 B1": [
        {
          "label": "Frame start",
          "bytes": "B1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "02",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B1 01 03 B1": [
        {
          "label": "Frame start",
          "bytes": "B1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "03",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B1 01 04 B1": [
        {
          "label": "Frame start",
          "bytes": "B1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "04",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B1 01 05 B1": [
        {
          "label": "Frame start",
          "bytes": "B1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "05",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B1 01 06 B1": [
        {
          "label": "Frame start",
          "bytes": "B1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "06",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B1 01 08 B1": [
        {
          "label": "Frame start",
          "bytes": "B1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "08",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B1 01 09 B1": [
        {
          "label": "Frame start",
          "bytes": "B1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "09",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B1 01 0C B1": [
        {
          "label": "Frame start",
          "bytes": "B1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "0C",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B1 01 0D B1": [
        {
          "label": "Frame start",
          "bytes": "B1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "0D",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B2 02 01 01 B2": [
        {
          "label": "Frame start",
          "bytes": "B2",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "01",
          "desc": "Enable",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B2",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B2 02 02 01 B2": [
        {
          "label": "Frame start",
          "bytes": "B2",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "02",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "01",
          "desc": "Enable",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B2",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B2 02 03 01 B2": [
        {
          "label": "Frame start",
          "bytes": "B2",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "03",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "01",
          "desc": "Enable",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B2",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B3 01 01 B3": [
        {
          "label": "Frame start",
          "bytes": "B3",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B3",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B3 01 02 B3": [
        {
          "label": "Frame start",
          "bytes": "B3",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "02",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B3",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B3 01 03 B3": [
        {
          "label": "Frame start",
          "bytes": "B3",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "03",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B3",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B4 89 01 01 02 00 01 00 00 01 23 3F 80 00 00 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 B4": [
        {
          "label": "Frame start",
          "bytes": "B4",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "89",
          "desc": "137 payload bytes",
          "type": "length"
        },
        {
          "label": "Channel group",
          "bytes": "01",
          "desc": "Channel group",
          "type": "data"
        },
        {
          "label": "Excitation out",
          "bytes": "01",
          "desc": "Excitation out",
          "type": "data"
        },
        {
          "label": "Excitation in",
          "bytes": "02",
          "desc": "Excitation in",
          "type": "data"
        },
        {
          "label": "Frequency row",
          "bytes": "00 01",
          "desc": "Frequency row",
          "type": "data"
        },
        {
          "label": "Timestamp",
          "bytes": "00 00 01 23",
          "desc": "Timestamp",
          "type": "data"
        },
        {
          "label": "Channel 1",
          "bytes": "3F 80 00 00 40 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 2",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 3",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 4",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 5",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 6",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 7",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 8",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 9",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 10",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 11",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 12",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 13",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 14",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 15",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 16",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B4",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B4 8B 01 01 00 00 01 00 01 00 00 01 23 3F 80 00 00 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 B4": [
        {
          "label": "Frame start",
          "bytes": "B4",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "8B",
          "desc": "139 payload bytes",
          "type": "length"
        },
        {
          "label": "Channel group",
          "bytes": "01",
          "desc": "Channel group",
          "type": "data"
        },
        {
          "label": "Excitation out",
          "bytes": "01 00",
          "desc": "Excitation out",
          "type": "data"
        },
        {
          "label": "Excitation in",
          "bytes": "00 01",
          "desc": "Excitation in",
          "type": "data"
        },
        {
          "label": "Frequency row",
          "bytes": "00 01",
          "desc": "Frequency row",
          "type": "data"
        },
        {
          "label": "Timestamp",
          "bytes": "00 00 01 23",
          "desc": "Timestamp",
          "type": "data"
        },
        {
          "label": "Channel 1",
          "bytes": "3F 80 00 00 40 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 2",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 3",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 4",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 5",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 6",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 7",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 8",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 9",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 10",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 11",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 12",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 13",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 14",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 15",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Channel 16",
          "bytes": "00 00 00 00 00 00 00 00",
          "desc": "Real and imaginary voltage, float32 each",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B4",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B4 01 01 B4": [
        {
          "label": "Frame start",
          "bytes": "B4",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B4",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B4 01 00 B4": [
        {
          "label": "Frame start",
          "bytes": "B4",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "00",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B4",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B5 01 00 B5": [
        {
          "label": "Frame start",
          "bytes": "B5",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "00",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B5",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B5 01 01 B5": [
        {
          "label": "Frame start",
          "bytes": "B5",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B5",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "C6 02 02 01 C6": [
        {
          "label": "Frame start",
          "bytes": "C6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Enabled",
          "bytes": "01",
          "desc": "Enabled",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "C6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "C6 02 03 0A C6": [
        {
          "label": "Frame start",
          "bytes": "C6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Capacity · %",
          "bytes": "0A",
          "desc": "Capacity · %",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "C6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "C7 01 01 C7": [
        {
          "label": "Frame start",
          "bytes": "C7",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "C7",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "C7 01 02 C7": [
        {
          "label": "Frame start",
          "bytes": "C7",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "C7",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "C7 01 03 C7": [
        {
          "label": "Frame start",
          "bytes": "C7",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "C7",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "C1 02 01 00 C1": [
        {
          "label": "Frame start",
          "bytes": "C1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "00",
          "desc": "Enable",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "C1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "C8 03 01 01 01 C8": [
        {
          "label": "Frame start",
          "bytes": "C8",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "LED",
          "bytes": "01",
          "desc": "LED",
          "type": "data"
        },
        {
          "label": "Setting",
          "bytes": "01",
          "desc": "Setting",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "C8",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "C8 03 02 01 01 C8": [
        {
          "label": "Frame start",
          "bytes": "C8",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "02",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "LED",
          "bytes": "01",
          "desc": "LED",
          "type": "data"
        },
        {
          "label": "Setting",
          "bytes": "01",
          "desc": "Setting",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "C8",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "C9 02 01 01 C9": [
        {
          "label": "Frame start",
          "bytes": "C9",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "LED",
          "bytes": "01",
          "desc": "LED",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "C9",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "C9 02 02 01 C9": [
        {
          "label": "Frame start",
          "bytes": "C9",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "02",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "LED",
          "bytes": "01",
          "desc": "LED",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "C9",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CB 04 01 01 01 01 CB": [
        {
          "label": "Frame start",
          "bytes": "CB",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Group",
          "bytes": "01",
          "desc": "Group",
          "type": "data"
        },
        {
          "label": "IO",
          "bytes": "01",
          "desc": "IO",
          "type": "data"
        },
        {
          "label": "Direction",
          "bytes": "01",
          "desc": "Direction",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CB",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CB 04 02 01 01 00 CB": [
        {
          "label": "Frame start",
          "bytes": "CB",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "02",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Group",
          "bytes": "01",
          "desc": "Group",
          "type": "data"
        },
        {
          "label": "IO",
          "bytes": "01",
          "desc": "IO",
          "type": "data"
        },
        {
          "label": "Level",
          "bytes": "00",
          "desc": "Level",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CB",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CB 03 81 01 01 CB": [
        {
          "label": "Frame start",
          "bytes": "CB",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "81",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Group",
          "bytes": "01",
          "desc": "Group",
          "type": "data"
        },
        {
          "label": "IO",
          "bytes": "01",
          "desc": "IO",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CB",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CB 02 82 01 CB": [
        {
          "label": "Frame start",
          "bytes": "CB",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "82",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Group",
          "bytes": "01",
          "desc": "Group",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CB",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CC 01 81 CC": [
        {
          "label": "Frame start",
          "bytes": "CC",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "81",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "CC",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CE 0F 01 C0 00 60 00 90 40 80 00 3F FD 00 00 00 00 CE": [
        {
          "label": "Frame start",
          "bytes": "CE",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "0F",
          "desc": "15 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "LTC",
          "bytes": "C0 00 60 00 90 40 80 00 3F FD",
          "desc": "80-bit LTC ending with sync word 3FFD",
          "type": "data"
        },
        {
          "label": "Internal timestamp",
          "bytes": "00 00 00 00",
          "desc": "Internal timestamp",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CE",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CE 03 01 00 01 CE": [
        {
          "label": "Frame start",
          "bytes": "CE",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Interval",
          "bytes": "00 01",
          "desc": "Interval",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CE",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "D1 00 D1": [
        {
          "label": "Frame start",
          "bytes": "D1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "00",
          "desc": "0 payload bytes",
          "type": "length"
        },
        {
          "label": "Frame end",
          "bytes": "D1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "D2 00 D2": [
        {
          "label": "Frame start",
          "bytes": "D2",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "00",
          "desc": "0 payload bytes",
          "type": "length"
        },
        {
          "label": "Frame end",
          "bytes": "D2",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 02 00 00 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "00",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Switch",
          "bytes": "00",
          "desc": "Switch",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 01 80 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "80",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 04 01 4C 61 62 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "SSID",
          "bytes": "4C 61 62",
          "desc": "Example network name Lab",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 01 81 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "81",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 02 03 01 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "03",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "01",
          "desc": "Enable",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 01 83 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "83",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 06 04 01 C0 00 02 0A F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "06",
          "desc": "6 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "04",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "IP address selector",
          "bytes": "01",
          "desc": "IP address selector",
          "type": "data"
        },
        {
          "label": "Address",
          "bytes": "C0 00 02 0A",
          "desc": "192.0.2.10, documentation example",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 02 84 01 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "84",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "IP address selector",
          "bytes": "01",
          "desc": "IP address selector",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 03 05 13 88 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "05",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Port",
          "bytes": "13 88",
          "desc": "Port",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 01 85 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "85",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 02 06 01 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "02",
          "desc": "2 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "06",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Switch",
          "bytes": "01",
          "desc": "Switch",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 01 86 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "86",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 01 87 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "87",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "F1 01 88 F1": [
        {
          "label": "Frame start",
          "bytes": "F1",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "88",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "F1",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 04 00 01 01 00 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "00",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "IO",
          "bytes": "01",
          "desc": "IO",
          "type": "data"
        },
        {
          "label": "Function",
          "bytes": "00",
          "desc": "Function",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 03 80 01 01 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "80",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "IO",
          "bytes": "01",
          "desc": "IO",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 04 01 01 04 01 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "UART Rx",
          "bytes": "04",
          "desc": "UART Rx",
          "type": "data"
        },
        {
          "label": "Sink",
          "bytes": "01",
          "desc": "Sink",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 03 81 01 04 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "81",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "UART Rx",
          "bytes": "04",
          "desc": "UART Rx",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 04 02 01 01 00 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "02",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "Output register",
          "bytes": "01",
          "desc": "Output register",
          "type": "data"
        },
        {
          "label": "Output bits",
          "bytes": "00",
          "desc": "Output bits",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 03 82 01 00 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "82",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "IO state register",
          "bytes": "00",
          "desc": "IO state register",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 05 03 01 03 01 00 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "05",
          "desc": "5 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "03",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "SPI master",
          "bytes": "03",
          "desc": "SPI master",
          "type": "data"
        },
        {
          "label": "CPOL selector",
          "bytes": "01",
          "desc": "CPOL selector",
          "type": "data"
        },
        {
          "label": "Idle low",
          "bytes": "00",
          "desc": "Idle low",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 04 83 01 03 01 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "83",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "SPI master",
          "bytes": "03",
          "desc": "SPI master",
          "type": "data"
        },
        {
          "label": "CPOL selector",
          "bytes": "01",
          "desc": "CPOL selector",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ]
    },
    "concepts": {}
  },
  "csx": {
    "meta": {
      "manual": "CSX-64",
      "revision": 20,
      "release": "2026-11-06"
    },
    "commands": {
      "18": {
        "code": "0x18",
        "name": "System messages",
        "group": "Protocol",
        "source": "Manual v20 · pp. 66–67",
        "description": "Device status, acknowledgements and communication errors.",
        "notes": "",
        "options": [
          {
            "code": "status",
            "title": "Status frame",
            "request": "Device → host: 18 01 [status] 18",
            "response": "—",
            "fields": [
              [
                "Status",
                "1",
                "uint8",
                "—",
                "01 malformed frame · 02 timeout · 04 boot complete · 11 TCP connection valid · 81 not executed · 82 unknown command · 83 acknowledged · 84 ready · 92 measurement data could not be sent",
                "—"
              ]
            ],
            "notes": "Route status messages separately from measurement data.",
            "examples": [
              {
                "title": "Successful command acknowledgement",
                "hex": "18 01 83 18",
                "why": "The status 83 acknowledges a command.",
                "received": true
              }
            ],
            "help": []
          }
        ]
      },
      "a1": {
        "code": "0xA1",
        "name": "Reset system",
        "group": "System",
        "source": "Manual v20 · p. 69",
        "description": "Restart the complete device.",
        "notes": "",
        "options": [
          {
            "code": "reset",
            "title": "Reset",
            "request": "A1 00 A1",
            "response": "ACK: 18 01 83 18; boot-ready and system-ready messages",
            "fields": [],
            "notes": "Reset clears temporary output options. Re-establish communication and setup after restart.",
            "examples": [
              {
                "title": "Restart device",
                "hex": "A1 00 A1",
                "why": "Restart command; distinguish ACK, boot-ready (04) and ready (84) status frames."
              }
            ],
            "help": []
          }
        ]
      },
      "d1": {
        "code": "0xD1",
        "name": "Get device ID",
        "group": "System",
        "source": "Manual v20 · pp. 68–69",
        "description": "Read the device type, serial number and delivery date.",
        "notes": "",
        "options": [
          {
            "code": "id",
            "title": "Read identity",
            "request": "D1 00 D1",
            "response": "D1 [LE] [general information:7] [reserved bytes] D1; then ACK: 18 01 83 18",
            "fields": [
              [
                "format version",
                "1",
                "uint8",
                "—",
                "1",
                "—"
              ],
              [
                "device identifier",
                "2",
                "uint16",
                "—",
                "Device type identifier",
                "—"
              ],
              [
                "serial number",
                "2",
                "uint16",
                "—",
                "Unique serial",
                "—"
              ],
              [
                "delivery year",
                "1",
                "uint8",
                "year",
                "2010 + byte",
                "—"
              ],
              [
                "delivery month",
                "1",
                "uint8",
                "month",
                "1–12",
                "—"
              ],
              [
                "reserved data",
                "variable",
                "reserved",
                "—",
                "Skip these bytes",
                "—"
              ]
            ],
            "notes": "The first seven payload bytes contain the identification fields. Treat any remaining bytes as reserved.",
            "examples": [
              {
                "title": "Identify device",
                "hex": "D1 00 D1",
                "why": "Decode general fields only when the returned format version is recognized."
              }
            ],
            "help": []
          }
        ]
      },
      "b6": {
        "code": "0xB6",
        "name": "Configure and read setup",
        "group": "Measurement",
        "source": "Manual v20 · pp. 69–79",
        "description": "Build a sequence of up to 255 measurement steps with device-specific port combinations.",
        "notes": "Initialize before replacing an existing setup. Read back and check the configuration before starting an acquisition.",
        "options": [
          {
            "code": "01",
            "title": "Initialize a setup",
            "request": "B6 01 01 B6",
            "response": "18 01 83 18 (ACK)",
            "fields": [],
            "notes": "Clears the active setup. Add steps and port combinations before acquisition.",
            "examples": [
              {
                "title": "Initialize a setup",
                "hex": "B6 01 01 B6",
                "why": "Clears the active setup. Add steps and port combinations before acquisition.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "EIS sweep",
            "request": "B6 [LE] 03 [step:2] [start:4] [stop:4] [steps:4] [scale] [precision:4] [amplitude:4] [spectra:2?] B6",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Start frequency",
                "4",
                "float32",
                "Hz",
                "At least 0.01",
                "—"
              ],
              [
                "Stop frequency",
                "4",
                "float32",
                "Hz",
                "At most 1,000,000",
                "—"
              ],
              [
                "Frequency steps",
                "4",
                "float32",
                "points",
                "At most 128 across all steps. Fractional input is rounded down.",
                "—"
              ],
              [
                "Scale",
                "1",
                "uint8",
                "—",
                "00=linear · 01=logarithmic",
                "—"
              ],
              [
                "Precision",
                "4",
                "float32",
                "—",
                "0–10. Higher values increase integration time.",
                "—"
              ],
              [
                "Amplitude",
                "4",
                "float32",
                "V or A peak",
                "Use the limits for the selected range and control mode.",
                "—"
              ],
              [
                "Spectrum count (optional)",
                "2",
                "uint16",
                "spectra",
                "1–65,535 overrides step duration. With this field omitted, the setpoint duration applies.",
                "—"
              ]
            ],
            "notes": "Applies to all port combinations within the selected step. Check amplitude against the selected range and mode.",
            "examples": [
              {
                "title": "EIS sweep",
                "hex": "B6 1A 03 00 01 44 7A 00 00 46 1C 40 00 41 20 00 00 01 3F 80 00 00 3C 23 D7 0A 00 01 B6",
                "why": "Applies to all port combinations within the selected step. Check amplitude against the selected range and mode.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "83",
            "title": "Read eis sweep",
            "request": "B6 03 83 [step:2] B6",
            "response": "B6 [LE] 83 [step:2] [start:4] [stop:4] [steps:4] [scale] [precision:4] [amplitude:4] [spectra:2?] B6 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Start frequency",
                "4",
                "float32",
                "Hz",
                "At least 0.01",
                "—"
              ],
              [
                "Stop frequency",
                "4",
                "float32",
                "Hz",
                "At most 1,000,000",
                "—"
              ],
              [
                "Frequency steps",
                "4",
                "float32",
                "points",
                "At most 128 across all steps. Fractional input is rounded down.",
                "—"
              ],
              [
                "Scale",
                "1",
                "uint8",
                "—",
                "00=linear · 01=logarithmic",
                "—"
              ],
              [
                "Precision",
                "4",
                "float32",
                "—",
                "0–10. Higher values increase integration time.",
                "—"
              ],
              [
                "Amplitude",
                "4",
                "float32",
                "V or A peak",
                "Use the limits for the selected range and control mode.",
                "—"
              ],
              [
                "Spectrum count (optional)",
                "2",
                "uint16",
                "spectra",
                "1–65,535 overrides step duration. With this field omitted, the setpoint duration applies.",
                "—"
              ]
            ],
            "notes": "Applies to all port combinations within the selected step. Check amplitude against the selected range and mode.",
            "examples": [
              {
                "title": "Read eis sweep",
                "hex": "B6 03 83 00 01 B6",
                "why": "Read the settings for step 1.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "07",
            "title": "Setpoint settings",
            "request": "B6 [LE] 07 [step:2] [port combination:4] [DAC] [technique] [parameters] [duration:4] B6",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Port combination",
                "4",
                "uint32 bit mask",
                "—",
                "0 targets all port combinations for set operations. Use the configured port-combination selector for readback.",
                "—"
              ],
              [
                "DAC",
                "1",
                "uint8",
                "—",
                "01 Global HR · 02 Global HS · 03 Bank HS",
                "—"
              ],
              [
                "Technique",
                "1",
                "uint8",
                "—",
                "01 constant · 02 cyclic · 03 pulse polarography · 04 square-wave polarography · 05 OCP · FF pause",
                "—"
              ],
              [
                "Constant parameters",
                "4",
                "float32",
                "V or A",
                "Set value",
                "—"
              ],
              [
                "Cyclic parameters",
                "24",
                "6 × float32",
                "V or A, except as indicated",
                "Minimum, maximum, scan rate (V/s or A/s), start value, step size (0 for a linear ramp), initial direction (+1 rising or −1 falling).",
                "—"
              ],
              [
                "Pulse polarography parameters",
                "24",
                "6 × float32",
                "—",
                "Minimum, maximum, step width, step height, pulse width, pulse height. Amplitude fields use V or A; use the technique specifications for timing and limits.",
                "—"
              ],
              [
                "Square-wave parameters",
                "variable",
                "float32 fields",
                "—",
                "Minimum, maximum, step height, pulse width and pulse height are listed. The syntax additionally mentions step width. Obtain the applicable layout before encoding this technique.",
                "—"
              ],
              [
                "OCP / pause parameters",
                "0",
                "—",
                "—",
                "No technique parameters",
                "—"
              ],
              [
                "Duration",
                "4",
                "uint32",
                "ms",
                "Duration of the step. A positive EIS spectrum count overrides duration for that EIS step.",
                "—"
              ]
            ],
            "notes": "The constant example sets a zero setpoint for 1 s. Select a compatible DAC, control mode and technique.",
            "examples": [
              {
                "title": "Setpoint settings",
                "hex": "B6 11 07 00 01 00 00 00 01 01 01 00 00 00 00 00 00 03 E8 B6",
                "why": "The constant example sets a zero setpoint for 1 s. Select a compatible DAC, control mode and technique.",
                "received": false
              },
              {
                "title": "Cyclic setpoint illustration",
                "hex": "B6 25 07 00 01 00 00 00 01 01 02 BD CC CC CD 3D CC CC CD 3D 4C CC CD 00 00 00 00 00 00 00 00 3F 80 00 00 00 00 27 10 B6",
                "why": "Example encodings for a voltage-controlled cyclic step: −0.1 to +0.1 V, 0.05 V/s, start at zero, linear ramp, increasing direction, 10 s.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "87",
            "title": "Read setpoint settings",
            "request": "B6 07 87 [step:2] [port combination:4] B6",
            "response": "B6 [LE] 87 [step:2] [port combination:4] [DAC] [technique] [parameters] [duration:4] B6 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Port combination",
                "4",
                "uint32 bit mask",
                "—",
                "0 targets all port combinations for set operations. Use the configured port-combination selector for readback.",
                "—"
              ],
              [
                "DAC",
                "1",
                "uint8",
                "—",
                "01 Global HR · 02 Global HS · 03 Bank HS",
                "—"
              ],
              [
                "Technique",
                "1",
                "uint8",
                "—",
                "01 constant · 02 cyclic · 03 pulse polarography · 04 square-wave polarography · 05 OCP · FF pause",
                "—"
              ],
              [
                "Constant parameters",
                "4",
                "float32",
                "V or A",
                "Set value",
                "—"
              ],
              [
                "Cyclic parameters",
                "24",
                "6 × float32",
                "V or A, except as indicated",
                "Minimum, maximum, scan rate (V/s or A/s), start value, step size (0 for a linear ramp), initial direction (+1 rising or −1 falling).",
                "—"
              ],
              [
                "Pulse polarography parameters",
                "24",
                "6 × float32",
                "—",
                "Minimum, maximum, step width, step height, pulse width, pulse height. Amplitude fields use V or A; use the technique specifications for timing and limits.",
                "—"
              ],
              [
                "Square-wave parameters",
                "variable",
                "float32 fields",
                "—",
                "Minimum, maximum, step height, pulse width and pulse height are listed. The syntax additionally mentions step width. Obtain the applicable layout before encoding this technique.",
                "—"
              ],
              [
                "OCP / pause parameters",
                "0",
                "—",
                "—",
                "No technique parameters",
                "—"
              ],
              [
                "Duration",
                "4",
                "uint32",
                "ms",
                "Duration of the step. A positive EIS spectrum count overrides duration for that EIS step.",
                "—"
              ]
            ],
            "notes": "The constant example sets a zero setpoint for 1 s. Select a compatible DAC, control mode and technique.",
            "examples": [
              {
                "title": "Read setpoint settings",
                "hex": "B6 07 87 00 01 00 00 00 01 B6",
                "why": "Read the settings for step 1 and the first port selector.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "08",
            "title": "Input ranges",
            "request": "B6 09 08 [step:2] [port combination:4] [voltage range] [current range] B6",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Port combination",
                "4",
                "uint32 bit mask",
                "—",
                "0 targets all port combinations for set operations. Use the configured port-combination selector for readback.",
                "—"
              ],
              [
                "Voltage range",
                "1",
                "uint8",
                "V",
                "01=10 · 02=1 · 03=0.1 · 04=0.01",
                "—"
              ],
              [
                "Current range",
                "1",
                "uint8",
                "A",
                "01=10 mA · 02=1 mA · 03=100 µA · 04=10 µA · 05=1 µA · 06=100 nA · 07=10 nA · 08=1 nA",
                "—"
              ]
            ],
            "notes": "Example selects 1 V and 100 µA ranges.",
            "examples": [
              {
                "title": "Input ranges",
                "hex": "B6 09 08 00 01 00 00 00 01 02 03 B6",
                "why": "Example selects 1 V and 100 µA ranges.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "88",
            "title": "Read input ranges",
            "request": "B6 07 88 [step:2] [port combination:4] B6",
            "response": "B6 09 88 [step:2] [port combination:4] [voltage range] [current range] B6 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Port combination",
                "4",
                "uint32 bit mask",
                "—",
                "0 targets all port combinations for set operations. Use the configured port-combination selector for readback.",
                "—"
              ],
              [
                "Voltage range",
                "1",
                "uint8",
                "V",
                "01=10 · 02=1 · 03=0.1 · 04=0.01",
                "—"
              ],
              [
                "Current range",
                "1",
                "uint8",
                "A",
                "01=10 mA · 02=1 mA · 03=100 µA · 04=10 µA · 05=1 µA · 06=100 nA · 07=10 nA · 08=1 nA",
                "—"
              ]
            ],
            "notes": "Example selects 1 V and 100 µA ranges.",
            "examples": [
              {
                "title": "Read input ranges",
                "hex": "B6 07 88 00 01 00 00 00 01 B6",
                "why": "Read the settings for step 1 and the first port selector.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "09",
            "title": "Control mode settings",
            "request": "B6 09 09 [step:2] [port combination:4] [setting] [value] B6",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Port combination",
                "4",
                "uint32 bit mask",
                "—",
                "0 targets all port combinations for set operations. Use the configured port-combination selector for readback.",
                "—"
              ],
              [
                "Setting",
                "1",
                "uint8",
                "—",
                "00 control mode · 01 amplifier bandwidth · 02 integrator · 03 transient stabilizer",
                "—"
              ],
              [
                "Mode value",
                "1",
                "uint8",
                "—",
                "00 uncontrolled · 01 potentiostat · 02 galvanostat · 03 poly-potentiostat · 04 OCP · FF pause",
                "—"
              ],
              [
                "Bandwidth value",
                "1",
                "uint8",
                "—",
                "00 high · 01 normal · 02 low",
                "00"
              ],
              [
                "Integrator / stabilizer value",
                "1",
                "uint8",
                "—",
                "00 off · 01 on",
                "00"
              ]
            ],
            "notes": "The meaning of the last byte depends on the selected setting.",
            "examples": [
              {
                "title": "Control mode settings",
                "hex": "B6 09 09 00 01 00 00 00 01 00 01 B6",
                "why": "The meaning of the last byte depends on the selected setting.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "89",
            "title": "Read control mode settings",
            "request": "B6 07 89 [step:2] [port combination:4] B6",
            "response": "B6 09 89 [step:2] [port combination:4] [setting] [value] B6 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Port combination",
                "4",
                "uint32 bit mask",
                "—",
                "0 targets all port combinations for set operations. Use the configured port-combination selector for readback.",
                "—"
              ],
              [
                "Setting",
                "1",
                "uint8",
                "—",
                "00 control mode · 01 amplifier bandwidth · 02 integrator · 03 transient stabilizer",
                "—"
              ],
              [
                "Mode value",
                "1",
                "uint8",
                "—",
                "00 uncontrolled · 01 potentiostat · 02 galvanostat · 03 poly-potentiostat · 04 OCP · FF pause",
                "—"
              ],
              [
                "Bandwidth value",
                "1",
                "uint8",
                "—",
                "00 high · 01 normal · 02 low",
                "00"
              ],
              [
                "Integrator / stabilizer value",
                "1",
                "uint8",
                "—",
                "00 off · 01 on",
                "00"
              ]
            ],
            "notes": "The meaning of the last byte depends on the selected setting.",
            "examples": [
              {
                "title": "Read control mode settings",
                "hex": "B6 07 89 00 01 00 00 00 01 B6",
                "why": "Read the settings for step 1 and the first port selector.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "0A",
            "title": "Data output settings",
            "request": "B6 0C 0A [step:2] [port combination:4] [interval:4] [EIS timestamp] B6",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Port combination",
                "4",
                "uint32 bit mask",
                "—",
                "0 targets all port combinations for set operations. Use the configured port-combination selector for readback.",
                "—"
              ],
              [
                "Data interval",
                "4",
                "float32",
                "s",
                "Interval between data points",
                "—"
              ],
              [
                "EIS timestamp",
                "1",
                "uint8",
                "—",
                "00 off · 01 on. Enabled timestamps are in ms.",
                "—"
              ]
            ],
            "notes": "Example selects 0.1 s intervals with optional EIS timestamps disabled.",
            "examples": [
              {
                "title": "Data output settings",
                "hex": "B6 0C 0A 00 01 00 00 00 01 3D CC CC CD 00 B6",
                "why": "Example selects 0.1 s intervals with optional EIS timestamps disabled.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "8A",
            "title": "Read data output settings",
            "request": "B6 07 8A [step:2] [port combination:4] B6",
            "response": "B6 0C 8A [step:2] [port combination:4] [interval:4] [EIS timestamp] B6 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Port combination",
                "4",
                "uint32 bit mask",
                "—",
                "0 targets all port combinations for set operations. Use the configured port-combination selector for readback.",
                "—"
              ],
              [
                "Data interval",
                "4",
                "float32",
                "s",
                "Interval between data points",
                "—"
              ],
              [
                "EIS timestamp",
                "1",
                "uint8",
                "—",
                "00 off · 01 on. Enabled timestamps are in ms.",
                "—"
              ]
            ],
            "notes": "Example selects 0.1 s intervals with optional EIS timestamps disabled.",
            "examples": [
              {
                "title": "Read data output settings",
                "hex": "B6 07 8A 00 01 00 00 00 01 B6",
                "why": "Read the settings for step 1 and the first port selector.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "0B",
            "title": "Port routing",
            "request": "B6 0B 0B [step:2] [port combination:4] [ports:4] B6",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Port combination",
                "4",
                "uint32 bit mask",
                "—",
                "0 targets all port combinations for set operations. Use the configured port-combination selector for readback.",
                "—"
              ],
              [
                "Ports",
                "4",
                "4 × uint8",
                "port",
                "Counter, Reference, WorkSense, Work in that order",
                "—"
              ]
            ],
            "notes": "The four port bytes are C, R, WS and W. Match the actual wiring before acquisition.",
            "examples": [
              {
                "title": "Port routing",
                "hex": "B6 0B 0B 00 01 00 00 00 01 01 02 03 04 B6",
                "why": "The four port bytes are C, R, WS and W. Match the actual wiring before acquisition.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "8B",
            "title": "Read port routing",
            "request": "B6 07 8B [step:2] [port combination:4] B6",
            "response": "B6 0B 8B [step:2] [port combination:4] [ports:4] B6 → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "0 targets all steps for set operations · 1–255 selects a step",
                "—"
              ],
              [
                "Port combination",
                "4",
                "uint32 bit mask",
                "—",
                "0 targets all port combinations for set operations. Use the configured port-combination selector for readback.",
                "—"
              ],
              [
                "Ports",
                "4",
                "4 × uint8",
                "port",
                "Counter, Reference, WorkSense, Work in that order",
                "—"
              ]
            ],
            "notes": "The four port bytes are C, R, WS and W. Match the actual wiring before acquisition.",
            "examples": [
              {
                "title": "Read port routing",
                "hex": "B6 07 8B 00 01 00 00 00 01 B6",
                "why": "Read the settings for step 1 and the first port selector.",
                "received": false
              }
            ],
            "help": []
          }
        ]
      },
      "b8": {
        "code": "0xB8",
        "name": "Start / stop and measurement data",
        "group": "Measurement",
        "source": "Manual v20 · pp. 79–82",
        "description": "Start or stop the configured sequence and decode impedance and time-domain data.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Run the setup once",
            "request": "B8 03 01 [iterations:2] B8",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Iterations",
                "2",
                "uint16",
                "runs",
                "0 continuous · 1–65,535 finite",
                "—"
              ]
            ],
            "notes": "The iteration count refers to the entire configured setup. A continuous run requires an explicit stop.",
            "examples": [
              {
                "title": "Run the setup once",
                "hex": "B8 03 01 00 01 B8",
                "why": "The iteration count refers to the entire configured setup. A continuous run requires an explicit stop.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "00",
            "title": "Stop acquisition",
            "request": "B8 01 00 B8",
            "response": "18 01 83 18 (ACK)",
            "fields": [],
            "notes": "",
            "examples": [
              {
                "title": "Stop acquisition",
                "hex": "B8 01 00 B8",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "eis-data",
            "title": "Impedance data",
            "request": "Device → host: B8 [LE] 01 [step:2] [ports:4] [timestamp:4?] [frequency index:2] [real:4] [imaginary:4] B8",
            "response": "Streamed during acquisition",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "1-based",
                "—"
              ],
              [
                "Ports",
                "4",
                "4 × uint8",
                "port",
                "Counter, Reference, WorkSense, Work in that order",
                "—"
              ],
              [
                "Timestamp (optional)",
                "4",
                "uint32",
                "ms",
                "Enable through B6/0A",
                "—"
              ],
              [
                "Frequency index",
                "2",
                "uint16",
                "index",
                "—",
                "—"
              ],
              [
                "Real / imaginary impedance",
                "4",
                "float32 each",
                "Ω",
                "—",
                "—"
              ]
            ],
            "notes": "LE=11 without timestamp. The listed fields occupy 21 bytes (LE=15) when a timestamp is present. Use LE and the configured timestamp mode when decoding; the manual prints a fixed LE=11 in the general layout.",
            "examples": [
              {
                "title": "Impedance frame without timestamp",
                "hex": "B8 11 01 00 01 01 02 03 04 00 00 42 C8 00 00 C1 20 00 00 B8",
                "why": "Step 1, frequency index 0, 100 − j10 Ω.",
                "received": true
              }
            ],
            "help": []
          },
          {
            "code": "time-data",
            "title": "Time-domain data",
            "request": "Device → host: B8 1B 02 [step:2] [timestamp:4] [ports:4] [current:4] [voltage:4] [charge:4] [energy:4] B8",
            "response": "Streamed during acquisition",
            "fields": [
              [
                "Step",
                "2",
                "uint16",
                "step",
                "1-based",
                "—"
              ],
              [
                "Timestamp",
                "4",
                "uint32",
                "ms",
                "Elapsed since start of the step",
                "—"
              ],
              [
                "Ports",
                "4",
                "4 × uint8",
                "port",
                "Counter, Reference, WorkSense, Work in that order",
                "—"
              ],
              [
                "Current",
                "4",
                "float32",
                "A",
                "—",
                "—"
              ],
              [
                "Voltage",
                "4",
                "float32",
                "V",
                "—",
                "—"
              ],
              [
                "Charge",
                "4",
                "float32",
                "C",
                "Integrated from measurement start",
                "—"
              ],
              [
                "Energy",
                "4",
                "float32",
                "J",
                "Integrated from measurement start",
                "—"
              ]
            ],
            "notes": "Timestamp is relative to the step. Charge and energy accumulate from measurement start.",
            "examples": [
              {
                "title": "Time-domain frame",
                "hex": "B8 1B 02 00 01 00 00 00 FA 01 02 03 04 38 D1 B7 17 3D CC CC CD 37 D1 B7 17 36 27 C5 AC B8",
                "why": "Illustrative sample 250 ms into step 1.",
                "received": true
              }
            ],
            "help": []
          }
        ]
      }
    },
    "frames": {
      "18 01 83 18": [
        {
          "label": "Frame start",
          "bytes": "18",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Status",
          "bytes": "83",
          "desc": "Status",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "18",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "A1 00 A1": [
        {
          "label": "CT · start",
          "bytes": "A1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "A1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "D1 00 D1": [
        {
          "label": "CT · start",
          "bytes": "D1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "D1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 01 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 1A 03 00 01 44 7A 00 00 46 1C 40 00 41 20 00 00 01 3F 80 00 00 3C 23 D7 0A 00 01 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "1A",
          "desc": "26 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "03",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Start",
          "bytes": "44 7A 00 00",
          "desc": "1000 Hz",
          "type": "data"
        },
        {
          "label": "Stop",
          "bytes": "46 1C 40 00",
          "desc": "10000 Hz",
          "type": "data"
        },
        {
          "label": "Points",
          "bytes": "41 20 00 00",
          "desc": "10",
          "type": "data"
        },
        {
          "label": "Scale",
          "bytes": "01",
          "desc": "Scale",
          "type": "data"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "1",
          "type": "data"
        },
        {
          "label": "Amplitude",
          "bytes": "3C 23 D7 0A",
          "desc": "0.01 V or A peak",
          "type": "data"
        },
        {
          "label": "Spectra",
          "bytes": "00 01",
          "desc": "Spectra",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 03 83 00 01 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "83",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 25 07 00 01 00 00 00 01 01 02 BD CC CC CD 3D CC CC CD 3D 4C CC CD 00 00 00 00 00 00 00 00 3F 80 00 00 00 00 27 10 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "25",
          "desc": "37 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "07",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "DAC",
          "bytes": "01",
          "desc": "DAC",
          "type": "data"
        },
        {
          "label": "Technique",
          "bytes": "02",
          "desc": "Technique",
          "type": "data"
        },
        {
          "label": "Minimum",
          "bytes": "BD CC CC CD",
          "desc": "-0.1 V",
          "type": "data"
        },
        {
          "label": "Maximum",
          "bytes": "3D CC CC CD",
          "desc": "0.1 V",
          "type": "data"
        },
        {
          "label": "Scan rate",
          "bytes": "3D 4C CC CD",
          "desc": "0.05 V/s",
          "type": "data"
        },
        {
          "label": "Start",
          "bytes": "00 00 00 00",
          "desc": "0 V",
          "type": "data"
        },
        {
          "label": "Step size",
          "bytes": "00 00 00 00",
          "desc": "0 V",
          "type": "data"
        },
        {
          "label": "Direction",
          "bytes": "3F 80 00 00",
          "desc": "1",
          "type": "data"
        },
        {
          "label": "Duration",
          "bytes": "00 00 27 10",
          "desc": "10,000 ms",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 11 07 00 01 00 00 00 01 01 01 00 00 00 00 00 00 03 E8 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "11",
          "desc": "17 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "07",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "DAC",
          "bytes": "01",
          "desc": "DAC",
          "type": "data"
        },
        {
          "label": "Technique",
          "bytes": "01",
          "desc": "Technique",
          "type": "data"
        },
        {
          "label": "Set value",
          "bytes": "00 00 00 00",
          "desc": "0 V or A",
          "type": "data"
        },
        {
          "label": "Duration",
          "bytes": "00 00 03 E8",
          "desc": "1,000 ms",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 07 87 00 01 00 00 00 01 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "07",
          "desc": "7 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "87",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 09 08 00 01 00 00 00 01 02 03 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "09",
          "desc": "9 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "08",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "Voltage range",
          "bytes": "02",
          "desc": "Voltage range",
          "type": "data"
        },
        {
          "label": "Current range",
          "bytes": "03",
          "desc": "Current range",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 07 88 00 01 00 00 00 01 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "07",
          "desc": "7 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "88",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 09 09 00 01 00 00 00 01 00 01 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "09",
          "desc": "9 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "09",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "Control-mode selector",
          "bytes": "00",
          "desc": "Control-mode selector",
          "type": "data"
        },
        {
          "label": "Potentiostat mode",
          "bytes": "01",
          "desc": "Potentiostat mode",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 07 89 00 01 00 00 00 01 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "07",
          "desc": "7 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "89",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 0C 0A 00 01 00 00 00 01 3D CC CC CD 00 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "0C",
          "desc": "12 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "0A",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "Data interval",
          "bytes": "3D CC CC CD",
          "desc": "0.1 s",
          "type": "data"
        },
        {
          "label": "EIS timestamp",
          "bytes": "00",
          "desc": "EIS timestamp",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 07 8A 00 01 00 00 00 01 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "07",
          "desc": "7 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "8A",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 0B 0B 00 01 00 00 00 01 01 02 03 04 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "0B",
          "desc": "11 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "0B",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "Counter",
          "bytes": "01",
          "desc": "Counter",
          "type": "data"
        },
        {
          "label": "Reference",
          "bytes": "02",
          "desc": "Reference",
          "type": "data"
        },
        {
          "label": "WorkSense",
          "bytes": "03",
          "desc": "WorkSense",
          "type": "data"
        },
        {
          "label": "Work",
          "bytes": "04",
          "desc": "Work",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B6 07 8B 00 01 00 00 00 01 B6": [
        {
          "label": "Frame start",
          "bytes": "B6",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "07",
          "desc": "7 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "8B",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Port selector",
          "bytes": "00 00 00 01",
          "desc": "First port-combination bit",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B6",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B8 03 01 00 01 B8": [
        {
          "label": "Frame start",
          "bytes": "B8",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Iterations",
          "bytes": "00 01",
          "desc": "Iterations",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B8",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B8 01 00 B8": [
        {
          "label": "Frame start",
          "bytes": "B8",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "01",
          "desc": "1 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "00",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Frame end",
          "bytes": "B8",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B8 11 01 00 01 01 02 03 04 00 00 42 C8 00 00 C1 20 00 00 B8": [
        {
          "label": "Frame start",
          "bytes": "B8",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "11",
          "desc": "17 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Counter",
          "bytes": "01",
          "desc": "Counter",
          "type": "data"
        },
        {
          "label": "Reference",
          "bytes": "02",
          "desc": "Reference",
          "type": "data"
        },
        {
          "label": "WorkSense",
          "bytes": "03",
          "desc": "WorkSense",
          "type": "data"
        },
        {
          "label": "Work",
          "bytes": "04",
          "desc": "Work",
          "type": "data"
        },
        {
          "label": "Frequency index",
          "bytes": "00 00",
          "desc": "Frequency index",
          "type": "data"
        },
        {
          "label": "Real",
          "bytes": "42 C8 00 00",
          "desc": "100 Ω",
          "type": "data"
        },
        {
          "label": "Imaginary",
          "bytes": "C1 20 00 00",
          "desc": "-10 Ω",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B8",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B8 1B 02 00 01 00 00 00 FA 01 02 03 04 38 D1 B7 17 3D CC CC CD 37 D1 B7 17 36 27 C5 AC B8": [
        {
          "label": "Frame start",
          "bytes": "B8",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "1B",
          "desc": "27 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "02",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Step",
          "bytes": "00 01",
          "desc": "Step 1",
          "type": "data"
        },
        {
          "label": "Timestamp",
          "bytes": "00 00 00 FA",
          "desc": "250 ms",
          "type": "data"
        },
        {
          "label": "Counter",
          "bytes": "01",
          "desc": "Counter",
          "type": "data"
        },
        {
          "label": "Reference",
          "bytes": "02",
          "desc": "Reference",
          "type": "data"
        },
        {
          "label": "WorkSense",
          "bytes": "03",
          "desc": "WorkSense",
          "type": "data"
        },
        {
          "label": "Work",
          "bytes": "04",
          "desc": "Work",
          "type": "data"
        },
        {
          "label": "Current",
          "bytes": "38 D1 B7 17",
          "desc": "0.0001 A",
          "type": "data"
        },
        {
          "label": "Voltage",
          "bytes": "3D CC CC CD",
          "desc": "0.1 V",
          "type": "data"
        },
        {
          "label": "Charge",
          "bytes": "37 D1 B7 17",
          "desc": "2.5e-05 C",
          "type": "data"
        },
        {
          "label": "Energy",
          "bytes": "36 27 C5 AC",
          "desc": "2.5e-06 J",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "B8",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ]
    },
    "concepts": {}
  },
  "medical": {
    "meta": {
      "manual": "Medical Research ISX-3",
      "revision": 27,
      "release": "2026-11-11"
    },
    "commands": {
      "90": {
        "code": "0x90",
        "name": "Save settings",
        "group": "System",
        "source": "Manual v27 · p. 80",
        "description": "Persist supported settings into flash. Only while no measurement is running.",
        "notes": "",
        "options": [
          {
            "code": "save",
            "title": "Save settings",
            "request": "90 00 90",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Save while the instrument is idle. This command stores NTC parameters and Sync Time in flash. Use it to retain changes to Ethernet settings.",
            "examples": [
              {
                "title": "Persist supported settings",
                "hex": "90 00 90",
                "why": "Wait for acknowledgement before starting a measurement or restarting the device."
              }
            ],
            "help": []
          }
        ]
      },
      "97": {
        "code": "0x97",
        "name": "Set output options",
        "group": "Measurement",
        "source": "Manual v27 · pp. 80–82",
        "description": "Enable timestamps or current-range fields in measurement data. Configure while idle.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "timestamp ms",
            "request": "97 02 01 [enable] 97",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "0"
              ]
            ],
            "notes": "Temporary; reset on restart. ms and µs timestamps are mutually exclusive; last configuration wins.",
            "examples": [
              {
                "title": "Enable timestamp ms",
                "hex": "97 02 01 01 97",
                "why": "Changes the B8 data frame layout; await ACK before starting."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "timestamp µs",
            "request": "97 02 02 [enable] 97",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "0"
              ]
            ],
            "notes": "Temporary; reset on restart. ms and µs timestamps are mutually exclusive; last configuration wins.",
            "examples": [
              {
                "title": "Enable timestamp µs",
                "hex": "97 02 02 01 97",
                "why": "Changes the B8 data frame layout; await ACK before starting."
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "current-range output",
            "request": "97 02 04 [enable] 97",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "0"
              ]
            ],
            "notes": "Temporary; reset on restart. ms and µs timestamps are mutually exclusive; last configuration wins.",
            "examples": [
              {
                "title": "Enable current-range output",
                "hex": "97 02 04 01 97",
                "why": "Changes the B8 data frame layout; await ACK before starting."
              }
            ],
            "help": []
          }
        ]
      },
      "98": {
        "code": "0x98",
        "name": "Get options / frequency limits",
        "group": "Measurement",
        "source": "Manual v27 · pp. 82–83",
        "description": "Read active output options or query the connected device frequency limits.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Timestamp state (ms query)",
            "request": "98 01 01 98",
            "response": "98 02 01 [timestamp] 98; then ACK: 18 01 83 18",
            "fields": [
              [
                "timestamp (response)",
                "1",
                "uint8",
                "—",
                "0=off; 1=ms; 2=µs",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read timestamp state",
                "hex": "98 01 01 98",
                "why": "Response reports the configured timestamp mode, followed by ACK."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Timestamp state (µs query)",
            "request": "98 01 02 98",
            "response": "98 02 02 [timestamp] 98; then ACK: 18 01 83 18",
            "fields": [
              [
                "timestamp (response)",
                "1",
                "uint8",
                "—",
                "0=off; 1=ms; 2=µs",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read timestamp state",
                "hex": "98 01 02 98",
                "why": "Readback; default mode is disabled."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Frequency limits",
            "request": "98 01 03 98",
            "response": "98 09 03 [MinF:4] [MaxF:4] 98; then ACK: 18 01 83 18",
            "fields": [
              [
                "MinF (response)",
                "4",
                "float32",
                "Hz",
                "Device-dependent minimum",
                "—"
              ],
              [
                "MaxF (response)",
                "4",
                "float32",
                "Hz",
                "Device-dependent maximum",
                "—"
              ]
            ],
            "notes": "Decode the two big-endian float32 values in Hz. Use these bounds when configuring AC frequencies. For DC resistance, set frequency to 0 Hz with B6/02.",
            "examples": [
              {
                "title": "Query supported frequency range",
                "hex": "98 01 03 98",
                "why": "The nine-byte payload contains the option byte followed by the minimum and maximum frequencies."
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "Current-range output state",
            "request": "98 01 04 98",
            "response": "98 02 04 [enabled] 98; then ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "0"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read range-output flag",
                "hex": "98 01 04 98",
                "why": "The reply reports whether measurement frames contain the current range field."
              }
            ],
            "help": []
          }
        ]
      },
      "a1": {
        "code": "0xA1",
        "name": "Reset system",
        "group": "System",
        "source": "Manual v27 · pp. 83–84",
        "description": "Restart the complete device.",
        "notes": "",
        "options": [
          {
            "code": "reset",
            "title": "Reset",
            "request": "A1 00 A1",
            "response": "ACK: 18 01 83 18; boot-ready and system-ready messages",
            "fields": [],
            "notes": "Reset clears temporary output options. Re-establish communication and setup after restart.",
            "examples": [
              {
                "title": "Restart device",
                "hex": "A1 00 A1",
                "why": "Restart command; distinguish ACK, boot-ready (04) and ready (84) status frames."
              }
            ],
            "help": []
          }
        ]
      },
      "b0": {
        "code": "0xB0",
        "name": "Set frontend settings",
        "group": "EIS",
        "source": "Manual v27 · pp. 84–87",
        "description": "Configure electrode routing and input ranges. Each configuration is appended to the channel stack.",
        "notes": "",
        "options": [
          {
            "code": "configure",
            "title": "Configure frontend",
            "request": "B0 [LE] [mode] [current range] [voltage range] [electrode triplets] B0",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "mode",
                "1",
                "uint8",
                "—",
                "01=2-point; 02=4-point; 03=3-point",
                "—"
              ],
              [
                "current range",
                "1",
                "uint8",
                "A",
                "00=auto; 01=±10 mA; 02=±100 µA; 04=±1 µA; 06=±10 nA",
                "—"
              ],
              [
                "voltage range (optional)",
                "1",
                "uint8",
                "V",
                "01=±1 V; 02=±90 mV",
                "01 if omitted"
              ],
              [
                "electrode port",
                "1",
                "uint8 each",
                "—",
                "01=main; 02=extension; 03=second/internal port, device-dependent",
                "—"
              ],
              [
                "extension channel",
                "2",
                "uint16 each",
                "channel",
                "Main port=0; otherwise module-supported channel",
                "—"
              ]
            ],
            "notes": "2-point: C,W (6 bytes). 3-point: C,R,W (9). 4-point: C,R,WS,W (12). With explicit voltage range LE=09/0C/0F. Omitting voltage range reduces LE by one. Clear stack before replacing configurations; up to 128 entries.",
            "examples": [
              {
                "title": "4-point main port",
                "hex": "B0 0F 02 00 01 01 00 00 01 00 00 01 00 00 01 00 00 B0",
                "why": "All electrodes on main port; auto current range and ±1 V voltage range."
              },
              {
                "title": "2-point main port",
                "hex": "B0 09 01 01 01 01 00 00 01 00 00 B0",
                "why": "Fixed ±10 mA current range; 2-point configuration."
              }
            ],
            "help": []
          },
          {
            "code": "clear",
            "title": "Clear channel stack",
            "request": "B0 03 FF FF FF B0",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Removes all frontend configurations. Configure at least one channel before measuring.",
            "examples": [
              {
                "title": "Clear frontend stack",
                "hex": "B0 03 FF FF FF B0",
                "why": "Await ACK, then append new frontend settings."
              }
            ],
            "help": []
          }
        ]
      },
      "b1": {
        "code": "0xB1",
        "name": "Get frontend settings",
        "group": "EIS",
        "source": "Manual v27 · pp. 87–90",
        "description": "Read channel-stack count or the frontend configuration of a selected channel.",
        "notes": "",
        "options": [
          {
            "code": "count",
            "title": "Channel count",
            "request": "B1 01 00 B1",
            "response": "B1 02 [count:2] B1; then ACK: 18 01 83 18",
            "fields": [
              [
                "count (response)",
                "2",
                "uint16",
                "channels",
                "Number of stack configurations",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read channel count",
                "hex": "B1 01 00 B1",
                "why": "The special one-byte zero request reads the count."
              }
            ],
            "help": []
          },
          {
            "code": "channel",
            "title": "Channel configuration",
            "request": "B1 02 [channel:2] B1",
            "response": "B1 [LE] [mode] [current range] [voltage range] [channel settings] B1; then ACK: 18 01 83 18",
            "fields": [
              [
                "channel",
                "2",
                "uint16",
                "index",
                "1-based configured channel index",
                "—"
              ],
              [
                "mode / current range / voltage range",
                "3",
                "3 × uint8",
                "—",
                "Same codes as B0",
                "—"
              ],
              [
                "channel settings",
                "6/9/12",
                "electrode pairs",
                "—",
                "Port:uint8 + extension channel:uint16 per electrode",
                "—"
              ]
            ],
            "notes": "Channel indices start at 1. The response uses the mode, range and electrode routing fields defined in B0.",
            "examples": [
              {
                "title": "Read channel configuration",
                "hex": "B1 02 00 01 B1",
                "why": "Read first configured frontend channel (channel 1)."
              }
            ],
            "help": []
          }
        ]
      },
      "b5": {
        "code": "0xB5",
        "name": "Get extension modules",
        "group": "Hardware",
        "source": "Manual v27 · pp. 91–93",
        "description": "Identify external and internal modules and optional channel counts.",
        "notes": "",
        "options": [
          {
            "code": "modules",
            "title": "Module discovery",
            "request": "B5 00 B5",
            "response": "B5 [LE] [external] [optional ext count:2] [internal] [optional int count:2] B5; then ACK: 18 01 83 18",
            "fields": [
              [
                "external module",
                "1",
                "uint8",
                "—",
                "00 none; 01 MEArack; 02 MuxModule32; 03 ECIS; 05 ExtensionPortAdapter; 06 SlideChip; 07 Mux32any2any; 08 DaQEisMux; 09 Mux32any2any2202",
                "—"
              ],
              [
                "internal module",
                "1",
                "uint8",
                "—",
                "00 none; 01 Mux16x4; 02 Mux32x2; 07 Mux32any2any; 09 Mux32any2any2202",
                "—"
              ],
              [
                "optional channel count",
                "2",
                "uint16",
                "channels",
                "Follows each nonzero module code; absent for 00",
                "—"
              ]
            ],
            "notes": "Each nonzero external or internal module code is followed by its channel count. A module code of 00 occupies one byte. LE is 02, 04 or 06, depending on the number of installed modules.",
            "examples": [
              {
                "title": "Discover connected modules",
                "hex": "B5 00 B5",
                "why": "Parse module code before deciding whether its channel count is present."
              }
            ],
            "help": []
          }
        ]
      },
      "b6": {
        "code": "0xB6",
        "name": "Set measurement setup",
        "group": "EIS",
        "source": "Manual v27 · pp. 93–102",
        "description": "Initialize and configure EIS frequency points, compensation, stored setups and feature-specific DC bias.",
        "notes": "Configure the frontend separately with B0. Call B6/01 before replacing the frequency setup.",
        "options": [
          {
            "code": "01",
            "title": "Initialize setup",
            "request": "B6 01 01 B6",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Discards current frequency setup. Configure frontend separately with B0.",
            "examples": [
              {
                "title": "Initialize empty frequency setup",
                "hex": "B6 01 01 B6",
                "why": "Add points or blocks before starting a measurement."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Add single frequency point",
            "request": "B6 [LE] 02 [frequency:4] [precision:4] [amplitude:4] [optional EOPs] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "frequency",
                "4",
                "float32",
                "Hz",
                "Query device limits; 0=DC resistance",
                "—"
              ],
              [
                "precision",
                "4",
                "float32",
                "—",
                "0–10",
                "0"
              ],
              [
                "amplitude",
                "4",
                "float32",
                "V / A peak",
                "Voltage 0.01–1 V; current 0.0001–0.01 A",
                "—"
              ],
              [
                "EOP ID",
                "1",
                "uint8",
                "—",
                "01=point delay; 02=phase sync; 03=excitation type",
                "Omitted"
              ],
              [
                "EOP value",
                "4",
                "uint32",
                "µs / flag / type",
                "Delay 0–180000000 µs; sync 0/1 (≥100 kHz); type 1=voltage,2=current",
                "delay=0; sync=0; type=1"
              ]
            ],
            "notes": "LE=0D+5×EOP count. Point IDs start at 0 across all blocks; total ≤2048. EOPs may be in any order. Last duplicate wins; duplicate identifiers are discouraged. An unknown EOP invalidates the entire command and returns NACK. Point Delay maximum 180,000,000 µs. Phase Sync below 100 kHz returns NACK; added timing depends on signal state, not a fixed delay.",
            "examples": [
              {
                "title": "32 kHz, 0.25 V peak",
                "hex": "B6 0D 02 46 FA 00 00 3F 80 00 00 3E 80 00 00 B6",
                "why": "Adds one point; voltage is default excitation type."
              },
              {
                "title": "Point Delay 1000 µs",
                "hex": "B6 12 02 46 FA 00 00 3F 80 00 00 3E 80 00 00 01 00 00 03 E8 B6",
                "why": "Excitation at current point → wait 1000 µs → acquire."
              },
              {
                "title": "200 kHz with Phase Sync",
                "hex": "B6 12 02 48 43 50 00 3F 80 00 00 3E 80 00 00 02 00 00 00 01 B6",
                "why": "Transitions 1→2 through N−1→N are synchronized. First point unaffected; a following point is required to observe a transition."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Add frequency block",
            "request": "B6 [LE] 03 [start:4] [stop:4] [count:4] [scale] [precision:4] [amplitude:4] [EOPs] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "start / stop",
                "4",
                "float32 each",
                "Hz",
                "Device frequency limits",
                "—"
              ],
              [
                "count",
                "4",
                "float32",
                "points",
                "Positive integer; includes boundaries; setup total ≤2048",
                "—"
              ],
              [
                "scale",
                "1",
                "uint8",
                "—",
                "0=linear; 1=logarithmic",
                "—"
              ],
              [
                "precision",
                "4",
                "float32",
                "—",
                "0–10",
                "0"
              ],
              [
                "amplitude",
                "4",
                "float32",
                "V / A peak",
                "Voltage 0.01–1 V; current 0.0001–0.01 A",
                "—"
              ],
              [
                "EOP ID",
                "1",
                "uint8",
                "—",
                "01=point delay; 02=phase sync; 03=excitation type",
                "Omitted"
              ],
              [
                "EOP value",
                "4",
                "uint32",
                "µs / flag / type",
                "Delay 0–180000000 µs; sync 0/1 (≥100 kHz); type 1=voltage,2=current",
                "delay=0; sync=0; type=1"
              ]
            ],
            "notes": "LE=16+5×EOP count. Count=1 uses start only; stop/scale ignored but still transmitted. EOPs may be in any order. Last duplicate wins; duplicate identifiers are discouraged. An unknown EOP invalidates the entire command and returns NACK. Point Delay maximum 180,000,000 µs. Phase Sync below 100 kHz returns NACK; added timing depends on signal state, not a fixed delay.",
            "examples": [
              {
                "title": "10-point log block",
                "hex": "B6 16 03 44 7A 00 00 47 C3 50 00 41 20 00 00 01 3F 80 00 00 3E 80 00 00 B6",
                "why": "10 measured points including 1 kHz and 100 kHz. IDs continue after all prior blocks."
              },
              {
                "title": "One-point block",
                "hex": "B6 16 03 44 7A 00 00 47 C3 50 00 3F 80 00 00 01 3F 80 00 00 3E 80 00 00 B6",
                "why": "Measures start frequency 1 kHz only; stop and scale are do not care."
              }
            ],
            "help": []
          },
          {
            "code": "05",
            "title": "Set amplitude",
            "request": "B6 06 05 [type] [amplitude:4] B6 OR B6 08 05 [Row:2] [type] [amplitude:4] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "Row (optional)",
                "2",
                "uint16",
                "frequency ID",
                "0-based individual point across all blocks",
                "—"
              ],
              [
                "type",
                "1",
                "uint8",
                "—",
                "1=voltage; 2=current",
                "—"
              ],
              [
                "amplitude",
                "4",
                "float32",
                "V / A peak",
                "Voltage 0.01–1 V; current 0.0001–0.01 A",
                "—"
              ]
            ],
            "notes": "Without Row: all points. With Row: one existing point.",
            "examples": [
              {
                "title": "Set all amplitudes to 0.25 V",
                "hex": "B6 06 05 01 3E 80 00 00 B6",
                "why": "LE=06; all configured frequencies."
              },
              {
                "title": "Set ID 0 amplitude",
                "hex": "B6 08 05 00 00 01 3E 80 00 00 B6",
                "why": "LE=08; only first configured point."
              }
            ],
            "help": []
          },
          {
            "code": "10",
            "title": "Start compensation",
            "request": "B6 01 10 B6 OR B6 02 10 [sendData] B6",
            "response": "ACK: 18 01 83 18; asynchronous B7 interaction requests",
            "fields": [
              [
                "sendData (optional)",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "0"
              ]
            ],
            "notes": "Configure the frontend and frequency setup before starting compensation. Use a fixed current range for the workflow shown in this guide.",
            "examples": [
              {
                "title": "Start compensation",
                "hex": "B6 01 10 B6",
                "why": "Await ACK and handle B7 open/short/load requests."
              }
            ],
            "help": []
          },
          {
            "code": "11",
            "title": "Compensation acknowledge",
            "request": "B6 01 11 B6 OR B6 02 11 [avgCount] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "avgCount (optional)",
                "1",
                "uint8",
                "spectra",
                "Number of averages. Omit the field for a single acquisition.",
                "1 if omitted"
              ]
            ],
            "notes": "Answer a B7 compensation interaction request after preparing the requested physical condition.",
            "examples": [
              {
                "title": "Continue without explicit averaging",
                "hex": "B6 01 11 B6",
                "why": "Optional averaging field omitted; documented default 1."
              },
              {
                "title": "Average 10 spectra",
                "hex": "B6 02 11 0A B6",
                "why": "Continue current compensation step with ten averages."
              }
            ],
            "help": []
          },
          {
            "code": "12",
            "title": "Abort compensation",
            "request": "B6 01 12 B6",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Answer interaction request with CNACK to abort.",
            "examples": [
              {
                "title": "Compensation abort",
                "hex": "B6 01 12 B6",
                "why": "Aborts the current compensation procedure."
              }
            ],
            "help": []
          },
          {
            "code": "13",
            "title": "Redo Open",
            "request": "B6 01 13 B6",
            "response": "ACK: 18 01 83 18; B7 01 13 B7 interaction request",
            "fields": [],
            "notes": "Applicable when idle after compensation completes or just after the corresponding step completed.",
            "examples": [
              {
                "title": "Redo Open",
                "hex": "B6 01 13 B6",
                "why": "Prepare requested condition and acknowledge the interaction."
              }
            ],
            "help": []
          },
          {
            "code": "14",
            "title": "Redo Short",
            "request": "B6 01 14 B6",
            "response": "ACK: 18 01 83 18; B7 01 14 B7 interaction request",
            "fields": [],
            "notes": "Applicable when idle after compensation completes or just after the corresponding step completed.",
            "examples": [
              {
                "title": "Redo Short",
                "hex": "B6 01 14 B6",
                "why": "Prepare requested condition and acknowledge the interaction."
              }
            ],
            "help": []
          },
          {
            "code": "15",
            "title": "Redo Load",
            "request": "B6 01 15 B6",
            "response": "ACK: 18 01 83 18; B7 01 15 B7 interaction request",
            "fields": [],
            "notes": "Applicable when idle after compensation completes or just after the corresponding step completed.",
            "examples": [
              {
                "title": "Redo Load",
                "hex": "B6 01 15 B6",
                "why": "Prepare requested condition and acknowledge the interaction."
              }
            ],
            "help": []
          },
          {
            "code": "16",
            "title": "Set reference load",
            "request": "B6 06 16 [type] [value:4] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "type",
                "1",
                "uint8",
                "—",
                "1=resistor; 2=capacitor",
                "—"
              ],
              [
                "value",
                "4",
                "float32",
                "Ω / F",
                "Reference load value",
                "—"
              ]
            ],
            "notes": "Set load value before acknowledging the B7 load interaction.",
            "examples": [
              {
                "title": "100 Ω reference load",
                "hex": "B6 06 16 01 42 C8 00 00 B6",
                "why": "Then send B6/11 once load is connected."
              }
            ],
            "help": []
          },
          {
            "code": "17",
            "title": "Reset / write compensation data",
            "request": "B6 02 17 01 B6 OR B6 1D 17 02 [channel] [Row:2] [six float32 values] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "subfunction",
                "1",
                "uint8",
                "—",
                "01=invalidate; 02=write",
                "—"
              ],
              [
                "channel",
                "1",
                "uint8",
                "channel",
                "1..configured channel count per B7 description",
                "—"
              ],
              [
                "Row",
                "2",
                "uint16",
                "frequency ID",
                "0..total points−1",
                "—"
              ],
              [
                "Open Re/Im, Short Re/Im, Load Re/Im",
                "4",
                "float32 each",
                "Ω",
                "Open Re/Im, Short Re/Im, Load Re/Im",
                "—"
              ]
            ],
            "notes": "Writing marks setup compensated. All frequencies and all channels must have valid compensation data. Values are complex impedance components in ohms.",
            "examples": [
              {
                "title": "Invalidate compensation",
                "hex": "B6 02 17 01 B6",
                "why": "Marks current compensation invalid. Read status with B7/17."
              }
            ],
            "help": []
          },
          {
            "code": "18",
            "title": "Compensation channel",
            "request": "B6 01 18 B6 OR B6 0E 18 [mode] [C][Cext:2][R][Rext:2][WS][WSext:2][W][Wext:2] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "mode",
                "1",
                "uint8",
                "—",
                "1=2-point; 2=4-point; 3=3-point",
                "—"
              ],
              [
                "port selector",
                "1",
                "uint8 per electrode",
                "—",
                "1=main; 2=extension; 3=second port",
                "—"
              ],
              [
                "extension channel",
                "2",
                "uint16 per electrode",
                "—",
                "Main port=0; module-supported channel otherwise",
                "—"
              ]
            ],
            "notes": "Use the short form to acquire compensation separately for each configured channel. The explicit routing format below carries all four electrode triplets. For a 2- or 3-point setup, use individual compensation.",
            "examples": [
              {
                "title": "Individual compensation mode",
                "hex": "B6 01 18 B6",
                "why": "Separate compensation data per configured measurement channel."
              }
            ],
            "help": []
          },
          {
            "code": "20",
            "title": "Load setup from slot",
            "request": "B6 02 20 [slot] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "slot",
                "1",
                "uint8",
                "slot",
                "1–255",
                "—"
              ]
            ],
            "notes": "Complete setup including compensation data. Slots 1–255 may be overwritten. Empty slots cannot be loaded. Slots survive restart; no slot is loaded automatically at startup.",
            "examples": [
              {
                "title": "Load slot 5",
                "hex": "B6 02 20 05 B6",
                "why": "Recall previously saved configuration; use B7/20 to store."
              }
            ],
            "help": []
          },
          {
            "code": "30",
            "title": "Enable / disable DC bias",
            "request": "B6 02 30 [enabled] B6",
            "response": "ACK: 18 01 83 18; bias regulation reports its outcome asynchronously",
            "fields": [
              [
                "enabled",
                "1",
                "uint8",
                "—",
                "0=disable; 1=enable",
                "—"
              ]
            ],
            "notes": "DC bias uses measurement port 1 (BNC). Connect the device under test and configure the frontend and frequency setup while idle. Set the target with B6/33 before enabling. Regulation starts at 0 V and proceeds toward the target.",
            "examples": [
              {
                "title": "Disable DC bias",
                "hex": "B6 02 30 00 B6",
                "why": "Set the enable switch to 00 to deactivate DC bias."
              }
            ],
            "help": []
          },
          {
            "code": "32",
            "title": "Abort DC-bias regulation",
            "request": "B6 01 32 B6",
            "response": "ACK: 18 01 83 18",
            "fields": [],
            "notes": "Use this request to abort DC bias regulation on measurement port 1.",
            "examples": [
              {
                "title": "Abort regulation",
                "hex": "B6 01 32 B6",
                "why": "Request cancellation of ongoing DC bias regulation."
              }
            ],
            "help": []
          },
          {
            "code": "33",
            "title": "Set DC-bias target",
            "request": "B6 05 33 [target:4] B6",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "target",
                "4",
                "float32",
                "V",
                "−1 to +1 V; excitation/bias combination constrained by 1 V limit",
                "—"
              ]
            ],
            "notes": "Set the target before enabling DC bias. Keep the combined excitation and bias within the 1 V measurement limit.",
            "examples": [
              {
                "title": "Example target 0.5 V",
                "hex": "B6 05 33 3F 00 00 00 B6",
                "why": "Set the DC bias target to 0.5 V. Allow for the AC excitation when selecting the target."
              }
            ],
            "help": []
          }
        ]
      },
      "b7": {
        "code": "0xB7",
        "name": "Get setup / interaction messages",
        "group": "EIS",
        "source": "Manual v27 · pp. 102–106",
        "description": "Read measurement settings and compensation data, save a setup slot, or interpret asynchronous device events.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Frequency count",
            "request": "B7 01 01 B7",
            "response": "B7 03 01 [count:2] B7; then ACK: 18 01 83 18",
            "fields": [
              [
                "count (response)",
                "2",
                "uint16",
                "points",
                "Total across all frequency blocks; ≤2048",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read configured point count",
                "hex": "B7 01 01 B7",
                "why": "Use to verify expected number of frequency IDs."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Frequency-point information",
            "request": "B7 [LE] 02 [Row:2] [optional EOP IDs] B7",
            "response": "B7 [LE] 02 [frequency:4] [precision:4] [amplitude:4] [EOP ID][value:4] … B7; then ACK: 18 01 83 18",
            "fields": [
              [
                "Row",
                "2",
                "uint16",
                "frequency ID",
                "0-based across all blocks",
                "—"
              ],
              [
                "EOP IDs",
                "1",
                "uint8 each",
                "—",
                "Optional list: 01=delay; 02=sync; 03=excitation type",
                "—"
              ],
              [
                "frequency / precision / amplitude",
                "4",
                "float32 each",
                "Hz / — / V or A peak",
                "Current point values",
                "—"
              ],
              [
                "returned EOP value",
                "4",
                "uint32",
                "µs / flag / type",
                "By EOP ID",
                "—"
              ]
            ],
            "notes": "Send LE=03 to read the base fields for one point. To request extended fields, append their option IDs. Each returned option value follows its ID.",
            "examples": [
              {
                "title": "Read ID 0",
                "hex": "B7 03 02 00 00 B7",
                "why": "Read the first frequency point."
              }
            ],
            "help": []
          },
          {
            "code": "04",
            "title": "Frequency list",
            "request": "B7 01 04 B7",
            "response": "B7 [LE] 04 [freq1:4] … [freqN:4] B7 (multiple frames); then ACK: 18 01 83 18",
            "fields": [
              [
                "frequencies",
                "4",
                "float32 each",
                "Hz",
                "Configured order",
                "—"
              ]
            ],
            "notes": "Each response holds up to 60 complete float32 values. LE equals 1 + 4 × the number of values. A 64-point list uses two frames with LE F1 and 11. Use B7/01 to obtain the total point count.",
            "examples": [
              {
                "title": "Read all frequencies",
                "hex": "B7 01 04 B7",
                "why": "Collect multiple data frames; ACK is separate. IDs correspond to zero-based list order."
              }
            ],
            "help": []
          },
          {
            "code": "13",
            "title": "Open interaction",
            "request": "Device → host: B7 01 13 B7",
            "response": "Host replies B6/11 to continue or B6/12 to abort",
            "fields": [],
            "notes": "",
            "examples": [
              {
                "title": "Received Open request",
                "hex": "B7 01 13 B7",
                "why": "Prepare the terminals so they are open before acknowledging the request."
              }
            ],
            "help": []
          },
          {
            "code": "14",
            "title": "Short interaction",
            "request": "Device → host: B7 01 14 B7",
            "response": "Host replies B6/11 to continue or B6/12 to abort",
            "fields": [],
            "notes": "",
            "examples": [
              {
                "title": "Received Short request",
                "hex": "B7 01 14 B7",
                "why": "Prepare the terminals so they are shorted before acknowledging the request."
              }
            ],
            "help": []
          },
          {
            "code": "15",
            "title": "Load interaction",
            "request": "Device → host: B7 01 15 B7",
            "response": "Host replies B6/11 to continue or B6/12 to abort",
            "fields": [],
            "notes": "Set the load with B6/16 before acknowledging with B6/11.",
            "examples": [
              {
                "title": "Received Load request",
                "hex": "B7 01 15 B7",
                "why": "Prepare the terminals so they are connected to the reference load before acknowledging the request."
              }
            ],
            "help": []
          },
          {
            "code": "10",
            "title": "Compensation completed event",
            "request": "Device → host: B7 01 10 B7",
            "response": "No reply specified",
            "fields": [],
            "notes": "The device sends this event after completing open, short and load measurements.",
            "examples": [
              {
                "title": "Received compensation completion",
                "hex": "B7 01 10 B7",
                "why": "Compensation workflow completion, distinct from spectrum completion."
              }
            ],
            "help": []
          },
          {
            "code": "17",
            "title": "Compensation status / data",
            "request": "B7 02 17 01 B7 OR B7 03 17 02 [channel] B7",
            "response": "B7 03 17 01 [status] B7 OR B7 1D 17 02 [channel][Row:2][six float32 values] B7; then ACK: 18 01 83 18",
            "fields": [
              [
                "subfunction",
                "1",
                "uint8",
                "—",
                "1=status; 2=data",
                "—"
              ],
              [
                "status",
                "1",
                "uint8",
                "—",
                "0=uncompensated; 1=compensated",
                "—"
              ],
              [
                "channel",
                "1",
                "uint8",
                "channel",
                "1..configured channel count",
                "—"
              ],
              [
                "Row",
                "2",
                "uint16",
                "frequency ID",
                "0-based",
                "—"
              ],
              [
                "six complex components",
                "4",
                "float32 each",
                "Ω",
                "Open Re/Im; Short Re/Im; Load Re/Im",
                "—"
              ]
            ],
            "notes": "Read compensation separately for each channel. The device returns one frame per configured frequency. Use the Row field to associate each set of impedance components with its frequency.",
            "examples": [
              {
                "title": "Read compensation status",
                "hex": "B7 02 17 01 B7",
                "why": "Read the compensation status of the active setup."
              },
              {
                "title": "Read channel 1 compensation",
                "hex": "B7 03 17 02 01 B7",
                "why": "Request the Open, Short and Load impedance components for channel 1."
              }
            ],
            "help": []
          },
          {
            "code": "20",
            "title": "Save setup to slot",
            "request": "B7 02 20 [slot] B7",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "slot",
                "1",
                "uint8",
                "slot",
                "1–255 per B6 slot description",
                "—"
              ]
            ],
            "notes": "Complete setup including compensation data. Slots 1–255 may be overwritten. Empty slots cannot be loaded. Slots survive restart; no slot is loaded automatically at startup.",
            "examples": [
              {
                "title": "Save slot 5",
                "hex": "B7 02 20 05 B7",
                "why": "Writes device storage. Recall using B6/20."
              }
            ],
            "help": []
          },
          {
            "code": "33",
            "title": "Read DC bias",
            "request": "B7 01 33 B7",
            "response": "B7 05 33 [bias:4] B7; then ACK: 18 01 83 18",
            "fields": [
              [
                "bias",
                "4",
                "float32",
                "V",
                "Currently configured DC bias",
                "—"
              ]
            ],
            "notes": "Read configured DC-bias value in V; measurement port 1 only.",
            "examples": [
              {
                "title": "Read DC bias",
                "hex": "B7 01 33 B7",
                "why": "Decode four-byte float in volts."
              }
            ],
            "help": []
          },
          {
            "code": "31",
            "title": "DC bias target reached",
            "request": "Device → host: B7 01 31 B7",
            "response": "No host acknowledgement required",
            "fields": [],
            "notes": "This event indicates that the target was reached. The failure-event encoding is outside the scope of this reference.",
            "examples": [
              {
                "title": "Illustrative success event",
                "hex": "B7 01 31 B7",
                "why": "The device has reached the requested DC bias target."
              }
            ],
            "help": []
          }
        ]
      },
      "b8": {
        "code": "0xB8",
        "name": "Start / stop measurement",
        "group": "Measurement",
        "source": "Manual v27 · pp. 106–109",
        "description": "Start and stop EIS acquisition and interpret the resulting impedance data.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Start EIS",
            "request": "B8 03 01 [spectra:2] B8",
            "response": "ACK: 18 01 83 18; streamed B8 measurement frames",
            "fields": [
              [
                "spectra",
                "2",
                "uint16",
                "spectra/channel",
                "0=continuous; 1–65535=finite",
                "—"
              ]
            ],
            "notes": "Complete a spectrum by receiving all expected frequency IDs. Channels start at 1 and follow the frontend stack; measurement packets carry no channel ID. Count spectra for every channel.",
            "examples": [
              {
                "title": "Acquire one spectrum per channel",
                "hex": "B8 03 01 00 01 B8",
                "why": "Automatic stop after one spectrum per configured channel."
              },
              {
                "title": "Continuous EIS",
                "hex": "B8 03 01 00 00 B8",
                "why": "Continue until B8/00 stop."
              }
            ],
            "help": []
          },
          {
            "code": "00",
            "title": "Stop acquisition",
            "request": "B8 01 00 B8",
            "response": "ACK: 18 01 83 18 after stopping; buffered data may still follow",
            "fields": [],
            "notes": "Immediately stops measurement, disables signal generation and disconnects DUT via frontend relays. Previously acquired buffered data can still arrive after ACK; ACK is not a buffer-drained indication.",
            "examples": [
              {
                "title": "Stop running measurement",
                "hex": "B8 01 00 B8",
                "why": "Continue parsing buffered data after ACK; treat a partial final spectrum as incomplete."
              }
            ],
            "help": []
          },
          {
            "code": "data",
            "title": "EIS measurement frames",
            "request": "Device → host: B8 [LE] [ID:2] [timestamp?] [range?] [Re:4] [Im:4] B8",
            "response": "Streamed data; not a host request",
            "fields": [
              [
                "ID",
                "2",
                "uint16",
                "frequency ID",
                "0-based across all frequency blocks",
                "—"
              ],
              [
                "timestamp (optional)",
                "4 / 5",
                "unsigned integer",
                "ms / µs",
                "Depends on 97/98",
                "Disabled"
              ],
              [
                "current range (optional)",
                "1",
                "uint8",
                "range code",
                "Per-point input range",
                "Disabled"
              ],
              [
                "real / imaginary",
                "4",
                "float32 each",
                "Ω",
                "Complex impedance; DC imaginary=0",
                "—"
              ]
            ],
            "notes": "LE: 0A no options; 0B range only; 0E ms only; 0F µs only OR ms+range; 10 µs+range. Configure decoder from active options, not length alone.",
            "examples": [
              {
                "title": "Default output · 100 − j10 Ω",
                "hex": "B8 0A 00 00 42 C8 00 00 C1 20 00 00 B8",
                "why": "Example impedance at frequency ID 0: 100 − j10 Ω."
              },
              {
                "title": "µs timestamp and range",
                "hex": "B8 10 00 00 00 00 0F 42 40 01 42 C8 00 00 C1 20 00 00 B8",
                "why": "LE=10 with both a microsecond timestamp and current range enabled."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Start EIT",
            "request": "B8 01 02 B8",
            "response": "ACK: 18 01 83 18, followed by EIT measurement data",
            "fields": [],
            "notes": "Available on installations with a compatible EIT option. Use the setup documentation for your installed configuration before starting EIT acquisition.",
            "examples": [
              {
                "title": "Start EIT",
                "hex": "B8 01 02 B8",
                "why": "Start acquisition with the active EIT setup. This reference covers EIT configuration and control. EIT measurement packets require a separate data format specification."
              }
            ],
            "help": []
          }
        ]
      },
      "b9": {
        "code": "0xB9",
        "name": "Set synchronization time",
        "group": "Measurement",
        "source": "Manual v27 · p. 109",
        "description": "Set the interval between consecutive spectra.",
        "notes": "",
        "options": [
          {
            "code": "sync",
            "title": "Set Sync Time",
            "request": "B9 04 [time:4] B9",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "time",
                "4",
                "uint32",
                "µs",
                "0–180,000,000 µs (180 s)",
                "0"
              ]
            ],
            "notes": "The interval applies between consecutive spectra, including a switch to another channel. SyncOut is low during the interval. Use 90 to save the setting.",
            "examples": [
              {
                "title": "1 ms between spectra",
                "hex": "B9 04 00 00 03 E8 B9",
                "why": "Wait 1 ms between the last point of one spectrum and the first point of the next."
              }
            ],
            "help": []
          }
        ]
      },
      "ba": {
        "code": "0xBA",
        "name": "Get synchronization time",
        "group": "Measurement",
        "source": "Manual v27 · pp. 109–110",
        "description": "Read the configured waiting time between spectra.",
        "notes": "",
        "options": [
          {
            "code": "sync",
            "title": "Read Sync Time",
            "request": "BA 00 BA",
            "response": "BA 04 [time:4] BA; then ACK: 18 01 83 18",
            "fields": [
              [
                "time (response)",
                "4",
                "uint32",
                "µs",
                "0–180,000,000 µs (180 s)",
                "0"
              ]
            ],
            "notes": "The interval applies between consecutive spectra, including a switch to another channel. SyncOut is low during the interval. Use 90 to save the setting.",
            "examples": [
              {
                "title": "Read Sync Time",
                "hex": "BA 00 BA",
                "why": "Decode the four-byte big-endian value in µs."
              }
            ],
            "help": []
          }
        ]
      },
      "bd": {
        "code": "0xBD",
        "name": "Set Ethernet configuration",
        "group": "Network",
        "source": "Manual v27 · pp. 110–111",
        "description": "Set static IPv4 address or DHCP mode.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Static IPv4",
            "request": "BD 05 01 [IPv4:4] BD",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "IPv4",
                "4",
                "4 × uint8",
                "octets",
                "Each 0–255",
                "0.0.0.0"
              ]
            ],
            "notes": "Static address applies only with DHCP disabled. Save settings for persistence; choose an address valid for your network.",
            "examples": [
              {
                "title": "Example static address",
                "hex": "BD 05 01 C0 A8 01 64 BD",
                "why": "Example address: 192.168.1.100. Substitute an available address on your network."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "DHCP mode",
            "request": "BD 02 03 [switch] BD",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "switch",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "1"
              ]
            ],
            "notes": "Reboot required to apply; save for persistence.",
            "examples": [
              {
                "title": "Enable DHCP",
                "hex": "BD 02 03 01 BD",
                "why": "Save the setting and restart the device with A1. Reconnect using the address assigned by your DHCP server."
              }
            ],
            "help": []
          }
        ]
      },
      "be": {
        "code": "0xBE",
        "name": "Get Ethernet configuration",
        "group": "Network",
        "source": "Manual v27 · pp. 111–112",
        "description": "Read actual IPv4 address, MAC address or DHCP mode.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "IPv4",
            "request": "BE 01 01 BE",
            "response": "BE 05 01 [IPv4:4] BE; then ACK: 18 01 83 18",
            "fields": [
              [
                "IPv4 (response)",
                "4",
                "4 × uint8",
                "—",
                "Actual allocated address",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read IPv4",
                "hex": "BE 01 01 BE",
                "why": "Data response precedes ACK."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "MAC",
            "request": "BE 01 02 BE",
            "response": "BE 07 02 [MAC:6] BE; then ACK: 18 01 83 18",
            "fields": [
              [
                "MAC (response)",
                "6",
                "6 × uint8",
                "—",
                "Hardware MAC address",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read MAC",
                "hex": "BE 01 02 BE",
                "why": "Data response precedes ACK."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "DHCP",
            "request": "BE 01 03 BE",
            "response": "BE 02 03 [DHCP:1] BE; then ACK: 18 01 83 18",
            "fields": [
              [
                "DHCP (response)",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read DHCP",
                "hex": "BE 01 03 BE",
                "why": "Data response precedes ACK."
              }
            ],
            "help": []
          }
        ]
      },
      "cf": {
        "code": "0xCF",
        "name": "TCP watchdog",
        "group": "Network",
        "source": "Manual v27 · pp. 112–113",
        "description": "Configure the interval for checking TCP client connectivity.",
        "notes": "",
        "options": [
          {
            "code": "interval",
            "title": "Watchdog interval",
            "request": "CF 05 00 [seconds:4] CF",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "seconds",
                "4",
                "uint32",
                "s",
                "1–600; step 1",
                "60"
              ]
            ],
            "notes": "The device checks the TCP connection by periodically sending status 11. If the send fails, the device returns its server socket to the listening state.",
            "examples": [
              {
                "title": "60-second watchdog",
                "hex": "CF 05 00 00 00 00 3C CF",
                "why": "Configure the device TCP connection watchdog."
              }
            ],
            "help": []
          }
        ]
      },
      "d0": {
        "code": "0xD0",
        "name": "Get ARM firmware ID",
        "group": "System",
        "source": "Manual v27 · p. 113",
        "description": "Read ARM firmware revision and build.",
        "notes": "",
        "options": [
          {
            "code": "id",
            "title": "Read ARM ID",
            "request": "D0 00 D0",
            "response": "D0 06 [internal:2] [revision:2] [build:2] D0; then ACK: 18 01 83 18",
            "fields": [
              [
                "internal",
                "2",
                "reserved",
                "—",
                "—",
                "—"
              ],
              [
                "revision",
                "2",
                "uint16",
                "—",
                "—",
                "—"
              ],
              [
                "build",
                "2",
                "uint16",
                "—",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read ARM firmware version",
                "hex": "D0 00 D0",
                "why": "The data frame arrives before the acknowledgement."
              },
              {
                "title": "Illustrative ARM response",
                "hex": "D0 06 01 05 00 3C 00 1D D0",
                "why": "Example response for revision 60, build 29."
              }
            ],
            "help": []
          }
        ]
      },
      "d1": {
        "code": "0xD1",
        "name": "Get device ID",
        "group": "System",
        "source": "Manual v27 · pp. 113–114",
        "description": "Read the device type, serial number and delivery date.",
        "notes": "",
        "options": [
          {
            "code": "id",
            "title": "Read identity",
            "request": "D1 00 D1",
            "response": "D1 [LE] [general information:7] [reserved bytes] D1; then ACK: 18 01 83 18",
            "fields": [
              [
                "format version",
                "1",
                "uint8",
                "—",
                "1",
                "—"
              ],
              [
                "device identifier",
                "2",
                "uint16",
                "—",
                "Device type identifier",
                "—"
              ],
              [
                "serial number",
                "2",
                "uint16",
                "—",
                "Unique serial",
                "—"
              ],
              [
                "delivery year",
                "1",
                "uint8",
                "year",
                "2010 + byte",
                "—"
              ],
              [
                "delivery month",
                "1",
                "uint8",
                "month",
                "1–12",
                "—"
              ],
              [
                "reserved data",
                "variable",
                "reserved",
                "—",
                "Skip these bytes",
                "—"
              ]
            ],
            "notes": "The first seven payload bytes contain the identification fields. Treat any remaining bytes as reserved.",
            "examples": [
              {
                "title": "Identify device",
                "hex": "D1 00 D1",
                "why": "Decode general fields only when the returned format version is recognized."
              }
            ],
            "help": []
          }
        ]
      },
      "d2": {
        "code": "0xD2",
        "name": "Get FPGA firmware ID",
        "group": "System",
        "source": "Manual v27 · pp. 114–115",
        "description": "Read FPGA firmware revision and build.",
        "notes": "",
        "options": [
          {
            "code": "id",
            "title": "Read FPGA ID",
            "request": "D2 00 D2",
            "response": "D2 09 [internal:5] [revision:2] [build:2] D2; then ACK: 18 01 83 18",
            "fields": [
              [
                "internal information",
                "5",
                "reserved",
                "—",
                "—",
                "—"
              ],
              [
                "revision",
                "2",
                "uint16",
                "—",
                "—",
                "—"
              ],
              [
                "build",
                "2",
                "uint16",
                "—",
                "—",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read FPGA version",
                "hex": "D2 00 D2",
                "why": "Ignore reserved developer bytes; decode revision and build as big-endian unsigned integers."
              }
            ],
            "help": []
          }
        ]
      },
      "18": {
        "code": "0x18",
        "name": "Acknowledgements / system messages",
        "group": "Protocol",
        "source": "Manual v27 · pp. 78–79",
        "description": "Device-to-host status frames. These are received messages, not requests.",
        "notes": "",
        "options": [
          {
            "code": "status",
            "title": "Status code",
            "request": "Device → host: 18 01 [status] 18",
            "response": "No host ACK response specified",
            "fields": [
              [
                "status",
                "1",
                "uint8",
                "—",
                "01=frame error; 02=timeout; 04=boot ready; 11=TCP connected/watchdog; 81=not executed; 82=unknown command; 83=executed; 84=system ready; 90=overcurrent; 91=overvoltage",
                "—"
              ]
            ],
            "notes": "Route status frames separately from measurement data.",
            "examples": [
              {
                "title": "Command executed",
                "hex": "18 01 83 18",
                "why": "Received from device. Do not send this as a configuration command."
              }
            ],
            "help": []
          }
        ]
      },
      "cb": {
        "code": "0xCB",
        "name": "MUX front IOs",
        "group": "Hardware",
        "source": "Manual v27 · pp. 128–130",
        "description": "Configure and read the four IOs on a supported MUX32/MUX64 accessory.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Set direction",
            "request": "CB 03 01 [channel] [value] CB",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "channel",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "value",
                "1",
                "uint8",
                "—",
                "0=input; 1=output",
                "0"
              ]
            ],
            "notes": "Available on MUX32 and MUX64 front IO channels 1–4.",
            "examples": [
              {
                "title": "Set direction IO1",
                "hex": "CB 03 01 01 01 CB",
                "why": "Configure IO1 as an output."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Set state",
            "request": "CB 03 02 [channel] [value] CB",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "channel",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "value",
                "1",
                "uint8",
                "—",
                "0=low; 1=high",
                "0"
              ]
            ],
            "notes": "Available on MUX32 and MUX64 front IO channels 1–4.",
            "examples": [
              {
                "title": "Set state IO1",
                "hex": "CB 03 02 01 01 CB",
                "why": "Drive IO1 high after configuring it as an output."
              }
            ],
            "help": []
          },
          {
            "code": "81",
            "title": "Read direction",
            "request": "CB 02 81 [channel] CB",
            "response": "CB 03 81 [channel] [value] CB; then ACK: 18 01 83 18",
            "fields": [
              [
                "channel",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "value (response)",
                "1",
                "uint8",
                "—",
                "0=input; 1=output",
                "0"
              ]
            ],
            "notes": "Available on MUX32 and MUX64 front IO channels 1–4.",
            "examples": [
              {
                "title": "Read direction IO1",
                "hex": "CB 02 81 01 CB",
                "why": "Read the input or output direction of IO1."
              }
            ],
            "help": []
          },
          {
            "code": "82",
            "title": "Read state",
            "request": "CB 02 82 [channel] CB",
            "response": "CB 03 82 [channel] [value] CB; then ACK: 18 01 83 18",
            "fields": [
              [
                "channel",
                "1",
                "uint8",
                "—",
                "1–4",
                "—"
              ],
              [
                "value (response)",
                "1",
                "uint8",
                "—",
                "0=low; 1=high",
                "0"
              ]
            ],
            "notes": "Available on MUX32 and MUX64 front IO channels 1–4.",
            "examples": [
              {
                "title": "Read state IO1",
                "hex": "CB 02 82 01 CB",
                "why": "Read the logic state of IO1."
              }
            ],
            "help": []
          }
        ]
      },
      "c2": {
        "code": "0xC2",
        "name": "Set battery mode",
        "group": "Battery",
        "source": "Manual v27 · pp. 143–144",
        "description": "Select battery measurement or automatic switchover threshold. Requires battery module.",
        "notes": "",
        "options": [
          {
            "code": "02",
            "title": "Measure on battery",
            "request": "C2 02 02 [enabled] C2",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "enabled",
                "1",
                "uint8",
                "—",
                "0=disable; 1=enable",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Enable battery operation",
                "hex": "C2 02 02 01 C2",
                "why": "Applies only to a device with battery hardware."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Minimum remaining capacity",
            "request": "C2 02 03 [percent] C2",
            "response": "ACK: 18 01 83 18",
            "fields": [
              [
                "percent",
                "1",
                "uint8",
                "%",
                "5–100 per functional description",
                "10"
              ]
            ],
            "notes": "At threshold switch to external supply while measurement continues.",
            "examples": [
              {
                "title": "10% switchover threshold",
                "hex": "C2 02 03 0A C2",
                "why": "10 decimal is 0A hexadecimal."
              }
            ],
            "help": []
          }
        ]
      },
      "c3": {
        "code": "0xC3",
        "name": "Get battery mode",
        "group": "Battery",
        "source": "Manual v27 · pp. 144–145",
        "description": "Read power source, remaining capacity and battery settings.",
        "notes": "",
        "options": [
          {
            "code": "01",
            "title": "Status and capacity",
            "request": "C3 01 01 C3",
            "response": "C3 03 01 [status] [capacity] C3; then ACK: 18 01 83 18",
            "fields": [
              [
                "status",
                "1",
                "bitmask",
                "—",
                "bit1: power source; bit0: charging; bits7–2: do not care",
                "—"
              ],
              [
                "capacity",
                "1",
                "uint8",
                "%",
                "0–100",
                "—"
              ]
            ],
            "notes": "Status bit1: 1=battery, 0=external. Bit0: 1=charging, 0=not charging. Bits7–2 are do not care.",
            "examples": [
              {
                "title": "Read battery status",
                "hex": "C3 01 01 C3",
                "why": "Decode source bit and capacity; do not interpret reserved bits."
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Battery measurement flag",
            "request": "C3 01 02 C3",
            "response": "C3 02 02 [enabled] C3; then ACK: 18 01 83 18",
            "fields": [
              [
                "enable",
                "1",
                "uint8",
                "—",
                "0=off; 1=on",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read battery selection",
                "hex": "C3 01 02 C3",
                "why": "Read whether battery measurement is enabled."
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Minimum capacity",
            "request": "C3 01 03 C3",
            "response": "C3 02 03 [percent] C3; then ACK: 18 01 83 18",
            "fields": [
              [
                "percent",
                "1",
                "uint8",
                "%",
                "5–100",
                "10"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read threshold",
                "hex": "C3 01 03 C3",
                "why": "Read configured switch-to-external threshold."
              }
            ],
            "help": []
          }
        ]
      },
      "ca": {
        "code": "0xCA",
        "name": "Configure IsoIOport",
        "group": "IO / NTC",
        "source": "Manual v27 · pp. 136–142",
        "description": "Assign isolated IO functions and exchange data with supported peripherals.",
        "notes": "Requires IsoIOport hardware. Use the dedicated pins for I²C.",
        "options": [
          {
            "code": "00",
            "title": "Set IO function",
            "request": "CA 04 00 [bank] [IO] [function] CA",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "IO",
                "1",
                "uint8",
                "—",
                "1–8 per bank",
                "—"
              ],
              [
                "Function",
                "1",
                "uint8",
                "—",
                "00 input · 01 output · 02 I²C SCL · 03 I²C SDA · 04 SPI SCLK · 05 SPI CS# · 06 SPI MOSI · 07 SPI MISO · 08 UART Tx · 09 UART Rx · 0A Sync Out · 0B Sync In",
                "—"
              ]
            ],
            "notes": "Use pins compatible with the electrical direction of their assigned function.",
            "examples": [
              {
                "title": "Set IO function",
                "hex": "CA 04 00 01 01 00 CA",
                "why": "Use pins compatible with the electrical direction of their assigned function.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "80",
            "title": "Read IO function",
            "request": "CA 03 80 [bank] [IO] CA",
            "response": "CA 04 80 [bank] [IO] [function] CA → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "IO",
                "1",
                "uint8",
                "—",
                "1–8 per bank",
                "—"
              ],
              [
                "Function",
                "1",
                "uint8",
                "—",
                "00 input · 01 output · 02 I²C SCL · 03 I²C SDA · 04 SPI SCLK · 05 SPI CS# · 06 SPI MOSI · 07 SPI MISO · 08 UART Tx · 09 UART Rx · 0A Sync Out · 0B Sync In",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read IO function",
                "hex": "CA 03 80 01 01 CA",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "01",
            "title": "Set UART Rx sink",
            "request": "CA 04 01 [bank] 04 [sink] CA",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Sink",
                "1",
                "uint8",
                "—",
                "00=high-speed USB · 01=full-speed USB",
                "01"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set UART Rx sink",
                "hex": "CA 04 01 01 04 01 CA",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "81",
            "title": "Read UART Rx sink",
            "request": "CA 03 81 [bank] 04 CA",
            "response": "CA 04 81 [bank] 04 [sink] CA → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Sink",
                "1",
                "uint8",
                "—",
                "00=high-speed USB · 01=full-speed USB",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read UART Rx sink",
                "hex": "CA 03 81 01 04 CA",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "02",
            "title": "Transfer peripheral data",
            "request": "CA [LE] 02 [bank] [interface] [data] CA",
            "response": "CA [LE] 82 [bank] [interface] [data] (when read data is available) CA → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Interface",
                "1",
                "uint8",
                "—",
                "00=IO state · 01=output register · 02=I²C · 03=SPI master · 04=UART",
                "—"
              ],
              [
                "Register data",
                "1",
                "bit field",
                "—",
                "MSB first from IO1 through IO8. State register is read-only.",
                "—"
              ],
              [
                "I²C data",
                "variable",
                "bytes",
                "—",
                "Address + R/W bit, TX count, TX bytes, optional RX count. TX/RX counts 0–15. A read returns the received bytes.",
                "—"
              ],
              [
                "SPI data",
                "variable",
                "bytes",
                "—",
                "RX count followed by TX bytes. A successful read returns received bytes. Up to 200 data bytes.",
                "—"
              ],
              [
                "UART data",
                "variable",
                "bytes",
                "—",
                "TX/RX bytes, up to 200. RX can arrive asynchronously.",
                "—"
              ]
            ],
            "notes": "I²C, SPI and UART operations use 02. Read replies and asynchronous UART data use option 82.",
            "examples": [
              {
                "title": "Transfer peripheral data",
                "hex": "CA 04 02 01 01 00 CA",
                "why": "I²C, SPI and UART operations use 02. Read replies and asynchronous UART data use option 82.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "82",
            "title": "Read IO register",
            "request": "CA 03 82 [bank] [interface] CA",
            "response": "CA [LE] 82 [bank] [interface] [data] CA → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Interface",
                "1",
                "uint8",
                "—",
                "00=IO state · 01=output register · 02=I²C · 03=SPI master · 04=UART",
                "—"
              ],
              [
                "Register data",
                "1",
                "bit field",
                "—",
                "MSB first from IO1 through IO8. State register is read-only.",
                "—"
              ]
            ],
            "notes": "Request 82 is available for the IO state and output registers.",
            "examples": [
              {
                "title": "Read IO register",
                "hex": "CA 03 82 01 00 CA",
                "why": "Request 82 is available for the IO state and output registers.",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "03",
            "title": "Set interface setting",
            "request": "CA [LE] 03 [bank] [interface] [setting] [value] CA",
            "response": "18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Setting",
                "1",
                "uint8",
                "—",
                "SPI: 00 SCLK-rate divisor, 01 CPOL. UART: 00 baud-rate divisor, 01 parity.",
                "—"
              ],
              [
                "Value",
                "1 or 4",
                "uint8 or uint32",
                "—",
                "Clock and baud values are uint32 divisors of 115 MHz. CPOL: 0 idle low, 1 idle high. Parity: 0 none, 1 even, 2 odd.",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Set interface setting",
                "hex": "CA 05 03 01 03 01 00 CA",
                "why": "",
                "received": false
              }
            ],
            "help": []
          },
          {
            "code": "83",
            "title": "Read interface setting",
            "request": "CA 04 83 [bank] [interface] [setting] CA",
            "response": "CA [LE] 83 [bank] [interface] [setting] [value] CA → 18 01 83 18 (ACK)",
            "fields": [
              [
                "Bank",
                "1",
                "uint8",
                "—",
                "01=A · 02=B · 03=C",
                "—"
              ],
              [
                "Setting",
                "1",
                "uint8",
                "—",
                "SPI: 00 SCLK-rate divisor, 01 CPOL. UART: 00 baud-rate divisor, 01 parity.",
                "—"
              ],
              [
                "Value",
                "1 or 4",
                "uint8 or uint32",
                "—",
                "Clock and baud values are uint32 divisors of 115 MHz. CPOL: 0 idle low, 1 idle high. Parity: 0 none, 1 even, 2 odd.",
                "—"
              ]
            ],
            "notes": "",
            "examples": [
              {
                "title": "Read interface setting",
                "hex": "CA 04 83 01 03 01 CA",
                "why": "",
                "received": false
              }
            ],
            "help": []
          }
        ]
      }
    },
    "frames": {
      "90 00 90": [
        {
          "label": "CT · start",
          "bytes": "90",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "90",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "97 02 01 01 97": [
        {
          "label": "CT · start",
          "bytes": "97",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "timestamp ms",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "01",
          "desc": "0=disable; 1=enable.",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "97",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "97 02 02 01 97": [
        {
          "label": "CT · start",
          "bytes": "97",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "timestamp µs",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "01",
          "desc": "0=disable; 1=enable.",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "97",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "97 02 04 01 97": [
        {
          "label": "CT · start",
          "bytes": "97",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "04",
          "desc": "current-range output",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "01",
          "desc": "0=disable; 1=enable.",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "97",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "98 01 01 98": [
        {
          "label": "CT · start",
          "bytes": "98",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "98",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "98 01 02 98": [
        {
          "label": "CT · start",
          "bytes": "98",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "98",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "98 01 03 98": [
        {
          "label": "CT · start",
          "bytes": "98",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "Frequency-limit query",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "98",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "98 01 04 98": [
        {
          "label": "CT · start",
          "bytes": "98",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "04",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "98",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "A1 00 A1": [
        {
          "label": "CT · start",
          "bytes": "A1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "A1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B0 0F 02 00 01 01 00 00 01 00 00 01 00 00 01 00 00 B0": [
        {
          "label": "CT · start",
          "bytes": "B0",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "0F",
          "desc": "15 payload bytes; total frame length 18.",
          "type": "length"
        },
        {
          "label": "Mode",
          "bytes": "02",
          "desc": "Mode",
          "type": "option"
        },
        {
          "label": "Current range",
          "bytes": "00",
          "desc": "Current range",
          "type": "option"
        },
        {
          "label": "Voltage range",
          "bytes": "01",
          "desc": "Voltage range",
          "type": "option"
        },
        {
          "label": "C port",
          "bytes": "01",
          "desc": "Main port",
          "type": "option"
        },
        {
          "label": "C channel",
          "bytes": "00 00",
          "desc": "Must be zero for main port",
          "type": "data"
        },
        {
          "label": "R port",
          "bytes": "01",
          "desc": "Main port",
          "type": "option"
        },
        {
          "label": "R channel",
          "bytes": "00 00",
          "desc": "Must be zero for main port",
          "type": "data"
        },
        {
          "label": "WS port",
          "bytes": "01",
          "desc": "Main port",
          "type": "option"
        },
        {
          "label": "WS channel",
          "bytes": "00 00",
          "desc": "Must be zero for main port",
          "type": "data"
        },
        {
          "label": "W port",
          "bytes": "01",
          "desc": "Main port",
          "type": "option"
        },
        {
          "label": "W channel",
          "bytes": "00 00",
          "desc": "Must be zero for main port",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B0",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B0 09 01 01 01 01 00 00 01 00 00 B0": [
        {
          "label": "CT · start",
          "bytes": "B0",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "09",
          "desc": "9 payload bytes; total frame length 12.",
          "type": "length"
        },
        {
          "label": "Mode",
          "bytes": "01",
          "desc": "Mode",
          "type": "option"
        },
        {
          "label": "Current range",
          "bytes": "01",
          "desc": "Current range",
          "type": "option"
        },
        {
          "label": "Voltage range",
          "bytes": "01",
          "desc": "Voltage range",
          "type": "option"
        },
        {
          "label": "C port",
          "bytes": "01",
          "desc": "C port",
          "type": "option"
        },
        {
          "label": "C channel",
          "bytes": "00 00",
          "desc": "C channel",
          "type": "data"
        },
        {
          "label": "W port",
          "bytes": "01",
          "desc": "W port",
          "type": "option"
        },
        {
          "label": "W channel",
          "bytes": "00 00",
          "desc": "W channel",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B0",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B0 03 FF FF FF B0": [
        {
          "label": "CT · start",
          "bytes": "B0",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "Clear marker",
          "bytes": "FF FF FF",
          "desc": "Special clear-stack payload",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B0",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B1 01 00 B1": [
        {
          "label": "CT · start",
          "bytes": "B1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "Count query",
          "bytes": "00",
          "desc": "Count query",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B1 02 00 01 B1": [
        {
          "label": "CT · start",
          "bytes": "B1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "Channel",
          "bytes": "00 01",
          "desc": "1-based channel-stack entry.",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B5 00 B5": [
        {
          "label": "CT · start",
          "bytes": "B5",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "B5",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 01 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 0D 02 46 FA 00 00 3F 80 00 00 3E 80 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "0D",
          "desc": "13 payload bytes; total frame length 16.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Frequency · Hz",
          "bytes": "46 FA 00 00",
          "desc": "Frequency · Hz",
          "type": "data"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 12 02 46 FA 00 00 3F 80 00 00 3E 80 00 00 01 00 00 03 E8 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "12",
          "desc": "18 payload bytes; total frame length 21.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Frequency · Hz",
          "bytes": "46 FA 00 00",
          "desc": "Frequency · Hz",
          "type": "data"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "EOP",
          "bytes": "01",
          "desc": "EOP",
          "type": "option"
        },
        {
          "label": "Point Delay · µs",
          "bytes": "00 00 03 E8",
          "desc": "Point Delay · µs",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 12 02 48 43 50 00 3F 80 00 00 3E 80 00 00 02 00 00 00 01 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "12",
          "desc": "18 payload bytes; total frame length 21.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Frequency · Hz",
          "bytes": "48 43 50 00",
          "desc": "Frequency · Hz",
          "type": "data"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "EOP",
          "bytes": "02",
          "desc": "EOP",
          "type": "option"
        },
        {
          "label": "Phase Sync",
          "bytes": "00 00 00 01",
          "desc": "Phase Sync",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 16 03 44 7A 00 00 47 C3 50 00 41 20 00 00 01 3F 80 00 00 3E 80 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "16",
          "desc": "22 payload bytes; total frame length 25.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Start · Hz",
          "bytes": "44 7A 00 00",
          "desc": "Start · Hz",
          "type": "data"
        },
        {
          "label": "Stop · Hz",
          "bytes": "47 C3 50 00",
          "desc": "Stop · Hz",
          "type": "data"
        },
        {
          "label": "Count",
          "bytes": "41 20 00 00",
          "desc": "Count",
          "type": "data"
        },
        {
          "label": "Scale",
          "bytes": "01",
          "desc": "Scale",
          "type": "option"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 16 03 44 7A 00 00 47 C3 50 00 3F 80 00 00 01 3F 80 00 00 3E 80 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "16",
          "desc": "22 payload bytes; total frame length 25.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Start · Hz",
          "bytes": "44 7A 00 00",
          "desc": "Start · Hz",
          "type": "data"
        },
        {
          "label": "Stop · Hz",
          "bytes": "47 C3 50 00",
          "desc": "Stop · Hz",
          "type": "data"
        },
        {
          "label": "Count",
          "bytes": "3F 80 00 00",
          "desc": "Count",
          "type": "data"
        },
        {
          "label": "Scale",
          "bytes": "01",
          "desc": "Scale",
          "type": "option"
        },
        {
          "label": "Precision",
          "bytes": "3F 80 00 00",
          "desc": "Precision",
          "type": "data"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 06 05 01 3E 80 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "06",
          "desc": "6 payload bytes; total frame length 9.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "05",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Type",
          "bytes": "01",
          "desc": "Type",
          "type": "option"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 08 05 00 00 01 3E 80 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "08",
          "desc": "8 payload bytes; total frame length 11.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "05",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Row / ID",
          "bytes": "00 00",
          "desc": "Row / ID",
          "type": "data"
        },
        {
          "label": "Type",
          "bytes": "01",
          "desc": "Type",
          "type": "option"
        },
        {
          "label": "Amplitude · Vpeak",
          "bytes": "3E 80 00 00",
          "desc": "Amplitude · Vpeak",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 10 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "10",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 11 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "11",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 02 11 0A B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "11",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Average count",
          "bytes": "0A",
          "desc": "Average count",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 12 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "12",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 13 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "13",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 14 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "14",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 15 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "15",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 06 16 01 42 C8 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "06",
          "desc": "6 payload bytes; total frame length 9.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "16",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Load type",
          "bytes": "01",
          "desc": "Load type",
          "type": "option"
        },
        {
          "label": "Load · Ω",
          "bytes": "42 C8 00 00",
          "desc": "Load · Ω",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 02 17 01 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "17",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Subfunction",
          "bytes": "01",
          "desc": "Subfunction",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 18 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "18",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 02 20 05 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "20",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Slot",
          "bytes": "05",
          "desc": "Slot",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 02 30 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "30",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Enable",
          "bytes": "00",
          "desc": "Enable",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 01 32 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "32",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B6 05 33 3F 00 00 00 B6": [
        {
          "label": "CT · start",
          "bytes": "B6",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "33",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "DC target · V",
          "bytes": "3F 00 00 00",
          "desc": "DC target · V",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B6",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 01 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 03 02 00 00 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Row",
          "bytes": "00 00",
          "desc": "Row",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 04 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "04",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 13 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "13",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 14 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "14",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 15 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "15",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 10 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "10",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 02 17 01 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "17",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Subfunction",
          "bytes": "01",
          "desc": "Subfunction",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 03 17 02 01 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "17",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Subfunction",
          "bytes": "02",
          "desc": "Subfunction",
          "type": "option"
        },
        {
          "label": "Channel",
          "bytes": "01",
          "desc": "Channel",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 02 20 05 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "20",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Slot",
          "bytes": "05",
          "desc": "Slot",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 33 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "33",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B7 01 31 B7": [
        {
          "label": "CT · start",
          "bytes": "B7",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "31",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B7",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 03 01 00 01 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Spectra",
          "bytes": "00 01",
          "desc": "Spectra",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 03 01 00 00 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Spectra",
          "bytes": "00 00",
          "desc": "Spectra",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 01 00 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "00",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 0A 00 00 42 C8 00 00 C1 20 00 00 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "0A",
          "desc": "10 payload bytes; total frame length 13.",
          "type": "length"
        },
        {
          "label": "Frequency ID",
          "bytes": "00 00",
          "desc": "Frequency ID",
          "type": "data"
        },
        {
          "label": "Real · Ω",
          "bytes": "42 C8 00 00",
          "desc": "Real · Ω",
          "type": "data"
        },
        {
          "label": "Imaginary · Ω",
          "bytes": "C1 20 00 00",
          "desc": "Imaginary · Ω",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B8 10 00 00 00 00 0F 42 40 01 42 C8 00 00 C1 20 00 00 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "10",
          "desc": "16 payload bytes; total frame length 19.",
          "type": "length"
        },
        {
          "label": "Frequency ID",
          "bytes": "00 00",
          "desc": "Frequency ID",
          "type": "data"
        },
        {
          "label": "Timestamp · µs",
          "bytes": "00 00 0F 42 40",
          "desc": "5-byte big-endian timestamp: 1,000,000 µs",
          "type": "data"
        },
        {
          "label": "Current range",
          "bytes": "01",
          "desc": "±10 mA",
          "type": "option"
        },
        {
          "label": "Real · Ω",
          "bytes": "42 C8 00 00",
          "desc": "Real · Ω",
          "type": "data"
        },
        {
          "label": "Imaginary · Ω",
          "bytes": "C1 20 00 00",
          "desc": "Imaginary · Ω",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "B9 04 00 00 03 E8 B9": [
        {
          "label": "CT · start",
          "bytes": "B9",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "04",
          "desc": "4 payload bytes; total frame length 7.",
          "type": "length"
        },
        {
          "label": "Sync Time · µs",
          "bytes": "00 00 03 E8",
          "desc": "Sync Time · µs",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "B9",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BA 00 BA": [
        {
          "label": "CT · start",
          "bytes": "BA",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "BA",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BD 05 01 C0 A8 01 64 BD": [
        {
          "label": "CT · start",
          "bytes": "BD",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "IPv4",
          "bytes": "C0 A8 01 64",
          "desc": "192.168.1.100, illustrative address.",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "BD",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BD 02 03 01 BD": [
        {
          "label": "CT · start",
          "bytes": "BD",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "DHCP",
          "bytes": "01",
          "desc": "DHCP",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BD",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BE 01 01 BE": [
        {
          "label": "CT · start",
          "bytes": "BE",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BE",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BE 01 02 BE": [
        {
          "label": "CT · start",
          "bytes": "BE",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BE",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "BE 01 03 BE": [
        {
          "label": "CT · start",
          "bytes": "BE",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "BE",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CF 05 00 00 00 00 3C CF": [
        {
          "label": "CT · start",
          "bytes": "CF",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "05",
          "desc": "5 payload bytes; total frame length 8.",
          "type": "length"
        },
        {
          "label": "Subcommand",
          "bytes": "00",
          "desc": "Subcommand",
          "type": "option"
        },
        {
          "label": "Interval · s",
          "bytes": "00 00 00 3C",
          "desc": "Interval · s",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "CF",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "D0 00 D0": [
        {
          "label": "CT · start",
          "bytes": "D0",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "D0",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "D0 06 01 05 00 3C 00 1D D0": [
        {
          "label": "CT · start",
          "bytes": "D0",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "06",
          "desc": "6 payload bytes; total frame length 9.",
          "type": "length"
        },
        {
          "label": "Internal",
          "bytes": "01 05",
          "desc": "Internal",
          "type": "data"
        },
        {
          "label": "Revision",
          "bytes": "00 3C",
          "desc": "Revision",
          "type": "data"
        },
        {
          "label": "Build",
          "bytes": "00 1D",
          "desc": "Build",
          "type": "data"
        },
        {
          "label": "CT · end",
          "bytes": "D0",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "D1 00 D1": [
        {
          "label": "CT · start",
          "bytes": "D1",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "D1",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "D2 00 D2": [
        {
          "label": "CT · start",
          "bytes": "D2",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "00",
          "desc": "0 payload bytes; total frame length 3.",
          "type": "length"
        },
        {
          "label": "CT · end",
          "bytes": "D2",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "18 01 83 18": [
        {
          "label": "CT · start",
          "bytes": "18",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "Status",
          "bytes": "83",
          "desc": "Command executed successfully.",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "18",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CB 03 01 01 01 CB": [
        {
          "label": "CT · start",
          "bytes": "CB",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Channel",
          "bytes": "01",
          "desc": "IO channel 1",
          "type": "option"
        },
        {
          "label": "Value",
          "bytes": "01",
          "desc": "0=input; 1=output",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "CB",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CB 03 02 01 01 CB": [
        {
          "label": "CT · start",
          "bytes": "CB",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "03",
          "desc": "3 payload bytes; total frame length 6.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Channel",
          "bytes": "01",
          "desc": "IO channel 1",
          "type": "option"
        },
        {
          "label": "Value",
          "bytes": "01",
          "desc": "0=low; 1=high",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "CB",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CB 02 81 01 CB": [
        {
          "label": "CT · start",
          "bytes": "CB",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "81",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Channel",
          "bytes": "01",
          "desc": "IO channel 1",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "CB",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CB 02 82 01 CB": [
        {
          "label": "CT · start",
          "bytes": "CB",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "82",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Channel",
          "bytes": "01",
          "desc": "IO channel 1",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "CB",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C2 02 02 01 C2": [
        {
          "label": "CT · start",
          "bytes": "C2",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Enabled",
          "bytes": "01",
          "desc": "Enabled",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C2",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C2 02 03 0A C2": [
        {
          "label": "CT · start",
          "bytes": "C2",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "02",
          "desc": "2 payload bytes; total frame length 5.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "Capacity · %",
          "bytes": "0A",
          "desc": "Capacity · %",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C2",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C3 01 01 C3": [
        {
          "label": "CT · start",
          "bytes": "C3",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "01",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C3",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C3 01 02 C3": [
        {
          "label": "CT · start",
          "bytes": "C3",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C3",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "C3 01 03 C3": [
        {
          "label": "CT · start",
          "bytes": "C3",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "03",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "C3",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ],
      "CA 04 00 01 01 00 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "00",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "IO",
          "bytes": "01",
          "desc": "IO",
          "type": "data"
        },
        {
          "label": "Function",
          "bytes": "00",
          "desc": "Function",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 03 80 01 01 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "80",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "IO",
          "bytes": "01",
          "desc": "IO",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 04 01 01 04 01 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "01",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "UART Rx",
          "bytes": "04",
          "desc": "UART Rx",
          "type": "data"
        },
        {
          "label": "Sink",
          "bytes": "01",
          "desc": "Sink",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 03 81 01 04 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "81",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "UART Rx",
          "bytes": "04",
          "desc": "UART Rx",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 04 02 01 01 00 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "02",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "Output register",
          "bytes": "01",
          "desc": "Output register",
          "type": "data"
        },
        {
          "label": "Output bits",
          "bytes": "00",
          "desc": "Output bits",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 03 82 01 00 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "03",
          "desc": "3 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "82",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "IO state register",
          "bytes": "00",
          "desc": "IO state register",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 05 03 01 03 01 00 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "05",
          "desc": "5 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "03",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "SPI master",
          "bytes": "03",
          "desc": "SPI master",
          "type": "data"
        },
        {
          "label": "CPOL selector",
          "bytes": "01",
          "desc": "CPOL selector",
          "type": "data"
        },
        {
          "label": "Idle low",
          "bytes": "00",
          "desc": "Idle low",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "CA 04 83 01 03 01 CA": [
        {
          "label": "Frame start",
          "bytes": "CA",
          "desc": "Command tag",
          "type": "tag"
        },
        {
          "label": "Payload length",
          "bytes": "04",
          "desc": "4 payload bytes",
          "type": "length"
        },
        {
          "label": "Option",
          "bytes": "83",
          "desc": "Operation selector",
          "type": "option"
        },
        {
          "label": "Bank",
          "bytes": "01",
          "desc": "Bank",
          "type": "data"
        },
        {
          "label": "SPI master",
          "bytes": "03",
          "desc": "SPI master",
          "type": "data"
        },
        {
          "label": "CPOL selector",
          "bytes": "01",
          "desc": "CPOL selector",
          "type": "data"
        },
        {
          "label": "Frame end",
          "bytes": "CA",
          "desc": "Repeats the command tag",
          "type": "tag"
        }
      ],
      "B8 01 02 B8": [
        {
          "label": "CT · start",
          "bytes": "B8",
          "desc": "Command tag; closing tag must match.",
          "type": "tag"
        },
        {
          "label": "LE · payload length",
          "bytes": "01",
          "desc": "1 payload bytes; total frame length 4.",
          "type": "length"
        },
        {
          "label": "OB",
          "bytes": "02",
          "desc": "OB",
          "type": "option"
        },
        {
          "label": "CT · end",
          "bytes": "B8",
          "desc": "Frame-end tag.",
          "type": "tag"
        }
      ]
    },
    "concepts": {
      "phase": {
        "title": "Phase synchronization",
        "body": "Synchronizes consecutive frequency transitions 1→2 through N−1→N; the first frequency is unaffected. Supported from 100 kHz inclusive. Useful for resonant DUTs where switching transients matter. Below 100 kHz, activation returns NACK. Added acquisition time depends on signal state and cannot be expressed as a fixed delay.",
        "encoding": "B6 EOP 02 + uint32: 0=off (default), 1=on. Optional pair adds 5 payload bytes.",
        "source": "Manual v123 · pp. 119, 121"
      },
      "delay": {
        "title": "Point Delay / settling",
        "body": "At the current frequency: start excitation, wait for Point Delay, then acquire. This allows settling transients to decay before measurement. It is distinct from the pause between spectra.",
        "encoding": "B6 EOP 01 + uint32 in µs. Range 0–180000000 (180 s); default 0. Pair adds 5 bytes.",
        "source": "Manual v123 · pp. 119, 121"
      },
      "precision": {
        "title": "Precision and repeatability",
        "body": "The Precision setting trades acquisition speed for repeatability. Higher values can improve measurement stability by extending acquisition time. Absolute accuracy describes how close results are to a reference value. For absolute accuracy, see the instrument specifications.",
        "encoding": "Required float32, 4 bytes; 0–10, documented default 0. Required fields must still be transmitted.",
        "source": "Manual v123 · pp. 28, 36, 118–121"
      },
      "excitation": {
        "title": "Excitation type and peak amplitude",
        "body": "Voltage and current excitation are supported. Voltage amplitude: 10 mV–1 V peak, equivalent to 20 mVpp–2 Vpp for a symmetric sinusoid. Current amplitude: 100 µA–10 mA peak. Input measurement range is a separate setting.",
        "encoding": "B6 EOP 03 uses uint32: 1=voltage (default), 2=current. B6/05 uses a 1-byte type. C4 defaults to current and supports float32/float64 amplitude.",
        "source": "Manual v123 · B6 and C4 command reference"
      },
      "count": {
        "title": "Point count and frequency IDs",
        "body": "B6 count means measured points including both endpoints. Send a positive integer encoded as float32. Count=1 measures start only; stop and scale are ignored but remain in the frame. IDs and Row start at 0 across all blocks: single point 0, then 9-point block 1–9, then 3-point block 10–12.",
        "encoding": "EIS setup total ≤2048. EIT C4 uses uint16 count and a separate 128-frequency stack in v123.",
        "source": "Manual v123 · B6 and C4 command reference"
      },
      "stack": {
        "title": "Channel stack and routing",
        "body": "Each B0 configuration appends one frontend configuration. Clear first to replace the stack. At most 128 entries; overflow returns NACK. Channels are numbered from 1. Each channel complete spectrum is transmitted before moving to the next, in stack order.",
        "encoding": "Clear: B0 03 FF FF FF B0. Each electrode: 1-byte port + 2-byte extension channel; main port extension channel is 0.",
        "source": "Manual v123 · pp. 108–114, 132"
      },
      "range": {
        "title": "Input measurement ranges",
        "body": "Choose the measurement range independently from excitation amplitude. Four fixed current ranges: ±10 mA, ±100 µA, ±1 µA, ±10 nA; auto range is also available. Auto range can change per frequency point. Poor selection can cause clipping or a weak signal-to-noise ratio.",
        "encoding": "B0 current codes 00=auto, 01=±10mA, 02=±100µA, 04=±1µA, 06=±10nA. Voltage 01=±1V (default if omitted), 02=±90mV.",
        "source": "Manual v123 · pp. 109–110"
      },
      "stream": {
        "title": "Receive complete spectra and stop correctly",
        "body": "Receive all expected frequency IDs to complete a channel spectrum; count complete spectra per channel. Packets carry no channel identifier: track the 1-based frontend channel sequence and expected point count. Stop disables excitation and disconnects DUT immediately. ACK confirms measurement has stopped; previously acquired buffered data may arrive afterwards. Use a timeout appropriate to the configured sweep and treat partial spectra as incomplete.",
        "encoding": "Await ACK/NACK before next host command. Measurement data can interleave with command responses. Decode timestamp/range according to 97/98 readback. Both are off by default.",
        "source": "Manual v123 · pp. 102–103, 130–133"
      },
      "sync": {
        "title": "Sync Time between spectra",
        "body": "Wait after the last point of a spectrum and before the first of the next. Applies also between spectra on different channels. SyncOut is low during this waiting interval. It is separate from Point Delay before a point acquisition and Phase Sync during a frequency transition.",
        "encoding": "B9 + uint32 µs; 0–180000000, default 0. Read BA; persist with 90.",
        "source": "Manual v123 · pp. 133–134"
      }
    }
  }
};
