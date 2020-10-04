# homebridge-stagg-ekg-plus-server
Stagg EKG+ Server for [homebridge-stagg-ekg-plus](https://www.npmjs.com/package/homebridge-stagg-ekg-plus)
<br />
Note: This is intended to be used on a Pi Zero W. I had a lot of issues getting bluetooth to stay connected on Pi 3 & 4.

## Basic Setup
```
git clone https://github.com/philscott-dev/homebridge-stagg-ekg-plus-server.git
cd homebridge-stagg-ekg-plus-server
npm install
touch .env
```

Config for `.env`:
```
# Kettle Mac Address
MAC_ADDRESS=00:11:22:33:44:55

# Server Port
PORT=8080
```

## Install Node
```
wget https://nodejs.org/dist/v11.15.0/node-v11.15.0-linux-armv6l.tar.gz
tar -xzf node-v11.15.0-linux-armv6l.tar.gz
sudo cp -R node-v11.15.0-linux-armv6l/* /usr/local/
node -v
rm -rf node-v*
```

## Configure Bluetooth
```
bluetoothctl power on
sudo setcap cap_net_raw+eip $(eval readlink -f $(which node))
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
sudo rfkill unblock 0
sudo ifconfig wlan0 up
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

SSH Hang:
```
sudo nano /etc/ssh/sshd_config
```
Add:
```
IPQoS 0x00
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

Cycle:
Received: "ffffffff" // Start Cycle
Received: "efdd03"
Received: "20012001" // Current Temp or Off (32)
Received: "efdd02"
Received: "cd01cd01" // Target Temp
Received: "efdd00"
Received: "000000"
Received: "efdd01"
Received: "010100"
Received: "efdd06"
Received: "000000"
Received: "efdd07"
Received: "000000"
Received: "efdd08"
Received: "010100"
Received: "efdd04"
Received: "00000000" // Hold Timer? (changes from 0 after target temp hits)
Received: "efdd05"
Received: "ffffffff" // End Cycle
```

Reading temperature data:

After authenticating, the data the kettle is sending will now start to include the temperature info.
There are packets with 3 character payloads in the form eedd0x which cycle from 0 to 8.
There are also packets w/4 hex char payloads. These are in the form 00 00 00 00, FF FF FF FF FF, and xx 01 xx 01.
Between FF FF FF FF packets, you'll get two temperature packets. The first is the current temperature in the kettle. The second one is the target temperature setting.
Valid temperature values range from 40 to 212 depending on your C/F setting. A value of freezing for the current temperature denotes the kettle being off.
Note that there is no Celsius/Fahrenheit setting in the protocol, you can determine the setting based on the current target temp. So a temperature setting in the range 104-212 means it is in F mode, while numbers 100 or less denote C. The kettle does not support settings the temp below 104 F so there is no overlap.


```
