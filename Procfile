web: node index.js
worker1: java -jar tools/selenium.jar -role hub -port 5555
worker2: java -jar tools/selenium.jar -role node -port 8080 -hub http://172.17.50.54:5555/grid/register/

