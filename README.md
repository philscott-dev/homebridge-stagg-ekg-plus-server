# homebridge-stagg-ekg-plus-server
Fellow Stagg EKG+ Server Application for ```homebridge-stagg-ekg-plus plugin```

## Basic Setup
Clone this repo to your Raspberry Pi then:
```
git clone https://github.com/philscott-dev/homebridge-stagg-ekg-plus-server.git
cd homebridge-stagg-ekg-plus-server
npm install
touch .env
```

Config for `.env`:
```
MAC_ADDRESS=00:11:22:33:44:55
PORT=8080
```

**MAC_ADDRESS**: Bluetooth Mac Address for your kettle. <br />
**PORT**: Port you'd like your server to be hosted on.


## Install Node 
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt install nodejs
```

## Install Bluetooth
```
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev bluez-hcidump
bluetoothctl power on
```

## Configure PM2
```
sudo npm install -g pm2
sudo pm2 startup systemd
pm2 start index.js --name "homebridge-stagg-ekg-plus-server"
pm2 save
```

## Configure Wifi
Turn Off Power Save:
```
/sbin/iw wlan0 get power_save
sudo nano /etc/rc.local
```

add BEFORE exit 0:
```
sudo /sbin/iw wlan0 set power_save off 
```

Configure Network Connection:
```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
network={
    ssid="The_ESSID_from_earlier"
    psk="Your_wifi_password"
}
```

## Troubleshooting
Troubleshooting Bluetooth:
```
sudo hcidump -t -x
```

Upgrade Raspberry Pi:
```
sudo apt update
sudo apt dist-upgrade -y
sudo reboot
```

## Kettle
```
Fahrenheit Range: 140 - 212
Celsius Range: 40 - 100 
```

```
Service: 1820
Characteristic: 2a80
```

```
Commands (Hex)
PowerOn:       efdd0a0000010100
PowerOff:      efdd0a0400000400
Authenticate:  efdd0b3031323334353637383930313233349a6d 
    in decimal: 012345678901234
Temperature:   efdd0ass01ttww01
    ss = step (hex)
    tt = temperature (hex)
    ww = ss + tt, then slice(-2)
```

Reading temperature data:

After authenticating, the data the kettle is sending will now start to include the temperature info.
There are packets with 3 character payloads in the form eedd0x which cycle from 0 to 8.
There are also packets w/4 hex char payloads. These are in the form 00 00 00 00, FF FF FF FF FF, and xx 01 xx 01.
Between FF FF FF FF packets, you'll get two temperature packets. The first is the current temperature in the kettle. The second one is the target temperature setting.
Valid temperature values range from 40 to 212 depending on your C/F setting. A value of freezing for the current temperature denotes the kettle being off.
Note that there is no Celsius/Fahrenheit setting in the protocol, you can determine the setting based on the current target temp. So a temperature setting in the range 104-212 means it is in F mode, while numbers 100 or less denote C. The kettle does not support settings the temp below 104 F so there is no overlap.


```
0|EKG Server  | Received: "0964020200560100000cbc"

0|EKG Server  | Received: "ffffffff"
0|EKG Server  | Received: "cc01cc01"
0|EKG Server  | Received: "cd01cd01"
0|EKG Server  | Received: "010100"
0|EKG Server  | Received: "010100"
0|EKG Server  | Received: "010100"
0|EKG Server  | Received: "000000"
0|EKG Server  | Received: "010100"
0|EKG Server  | Received: "ed0ded0d"
0|EKG Server  | Received: "ffffffff"

0|EKG Server  | Received: "ffffffff"
0|EKG Server  | Received: "efdd03"
0|EKG Server  | Received: "cc01cc01"
0|EKG Server  | Received: "efdd02"
0|EKG Server  | Received: "cd01cd01"
0|EKG Server  | Received: "efdd00"
0|EKG Server  | Received: "010100"
0|EKG Server  | Received: "efdd01"
0|EKG Server  | Received: "010100"
0|EKG Server  | Received: "efdd06"
0|EKG Server  | Received: "010100"
0|EKG Server  | Received: "efdd07"
0|EKG Server  | Received: "000000"
0|EKG Server  | Received: "efdd08"
0|EKG Server  | Received: "010100"
0|EKG Server  | Received: "efdd04"
0|EKG Server  | Received: "ed0ded0d"
0|EKG Server  | Received: "efdd05"
0|EKG Server  | Received: "ffffffff"
```
