# homebridge-stagg-ekg-plus
Server & Homebridge plugin for the Stagg EKG+ electric kettle

## Setup
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt install nodejs
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev

## pm2
sudo npm install -g pm2
sudo pm2 startup
pm2 start serverfile
pm2 save

## Turn on wifi
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
append:
network={
    ssid="The_ESSID_from_earlier"
    psk="Your_wifi_password"
}

## Turn on bluetooth
bluetoothctl power on

## certbot
https://dev.to/omergulen/step-by-step-node-express-ssl-certificate-run-https-server-from-scratch-in-5-steps-5b87

sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update

sudo apt-get install certbot

## gatttool Commands
Interactive:    gatttool -I
Connect:        connect 00:1C:97:19:54:A2
Subscribe:      char-write-req 0x000e 0100
Unsubscribe:    char-write-req 0x000e 0000
Authenticate:   char-write-cmd 0x000d efdd0b3031323334353637383930313
Power On:       char-write-cmd 0x000d efdd0a0000010100
Power Off:      char-write-cmd 0x000d efdd0a0400000400

??? 
Temp:           char-write-cmd 0x000d efdd0a0101cdce01 (set to 205 F)

> char-write-cmd 0x000d efdd0b3031323334353637383930313233349a6d ???




How to get started:

Subscribe to the 2a80 characteristic in the 1820 service. The kettle will start sending you packets continuously.

Next, you have to send some sort of authorization packet with the very creative password (012345678901234).

Encoded in hex it looks like this: efdd0b3031323334353637383930313233349a6d

EF DD is some header , 0b seems to denote message type, 30, 31, 32... is the password encoded in hex

Reading temperature data:

After authenticating, the data the kettle is sending will now start to include the temperature info.

There are packets with 3 character payloads in the form eedd0x which cycle from 0 to 8.

There are also packets w/4 hex char payloads. These are in the form 00 00 00 00, FF FF FF FF FF, and xx 01 xx 01.

Between FF FF FF FF packets, you'll get two temperature packets. The first is the current temperature in the kettle. The second one is the target temperature setting.

Valid temperature values range from 40 to 212 depending on your C/F setting. A value of freezing for the current temperature denotes the kettle being off.

Note that there is no Celsius/Fahrenheit setting in the protocol, you can determine the setting based on the current target temp. So a temperature setting in the range 104-212 means it is in F mode, while numbers 100 or less denote C. The kettle does not support settings the temp below 104 F so there is no overlap.

Setting the temperature:

The command is in the form: efdd0ass01ttww01. This has a sort of checksum process.

ss = keep track of a count from 0 to 255 (00 to FF) while doing temperature change requests. i.e. the first time you change the temp it's 1 then 2 then 3 up to 255 then cycle back to 0.

tt = your desired temperature in hex

ww = (ss + tt) & 0xff (add ss to your desired temperature then take the last two hex digits of the result if it overflows 2 (this it what bitwise & FF is doing)

For example: given ss = 01, a desired temp 205 (0xcd) would yield efdd0a0101cdce01

If you want to be lazy then you can fix `ss` to be `00` then `tt` and `ww` will both just be your temperature. This seemed to work fine but I implemented it as above since that's what the Fellow iOS app was doing.

Edit: Forgot to include the most important thing: 4. Turning on and off

On: efdd0a0000010100

Off: efdd0a0400000400