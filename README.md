# homebridge-stagg-ekg-plus-server
Stagg EKG+ Server for [homebridge-stagg-ekg-plus](https://www.npmjs.com/package/homebridge-stagg-ekg-plus)
<br /><br />
**Note**: 
_This is intended to be used on a Pi Zero W_
</br>

## Basic Setup
```
git clone https://github.com/philscott-dev/homebridge-stagg-ekg-plus-server.git
cd homebridge-stagg-ekg-plus-server
npm install
touch .env (then configure)
npm start
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
or 
sudo env PATH=$PATH:/usr/local/bin pm2 startup systemd -u pi --hp /home/pi

pm2 start npm --name "homebridge-stagg-ekg-plus-server" -- start
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
    ssid="Your SSID"
    psk="Your Wifi Password"
}
```

## Troubleshooting
Upgrade Raspberry Pi:
```
sudo apt update
sudo apt upgrade
sudo apt dist-upgrade -y
sudo reboot
```

SSH Hanging?:
```
sudo nano /etc/ssh/sshd_config
```
and add:
```
IPQoS 0x00
```

## Kettle Notes
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
Temperature:   efdd0ass01ttww01
    ss = step (hex)
    tt = temperature (hex)
    ww = ss + tt, then slice(-2)

Cycle:
0  Received: "ffffffff" // Start Cycle
1  Received: "efdd03"
2  Received: "20012001" // Current Temp or Off (32)
3  Received: "efdd02"
4  Received: "cd01cd01" // Target Temp
5  Received: "efdd00"
6  Received: "000000"
7  Received: "efdd01"
8  Received: "010100"
9  Received: "efdd06"
10 Received: "000000"
11 Received: "efdd07"
12 Received: "000000"
13 Received: "efdd08"
14 Received: "010100"
15 Received: "efdd04"
16 Received: "00000000" // Hold Timer? (changes from 0 after target temp hits)
17 Received: "efdd05"
0  Received: "ffffffff" // End Cycle
```