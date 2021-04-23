echo "updating existing packages"
sudo yum update -y
sudo yum install wget -y
sudo yum install unzip -y
sudo yum install lsof -y

echo "installing java 8"
sudo yum install -y java-1.8.0-openjdk-devel
sudo update-alternatives --config java
sudo update-alternatives --config javac
echo "java 8 installed and configured"

echo "installing node"
curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum -y install nodejs
echo "node installed"

echo "install Angular"
sudo npm install -g @angular/cli
sudo npm install -g http-server
echo "Angular namespace now functional"

echo "installing gradle"
sudo wget https://services.gradle.org/distributions/gradle-6.8.3-bin.zip -P /tmp
sudo mkdir /opt/gradle
sudo unzip -d /opt/gradle /tmp/gradle-*.zip
echo "time to create the gradle environment variable, BUT, you may have to input this manually, the script isn't triggering it"
export PATH=$PATH:/opt/gradle/gradle-6.8.3/bin
echo "gradle installed"

echo "installing jenkins"
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
sudo rpm --import http://pkg.jenkins.io/redhat/jenkins.io.key
sudo yum install jenkins -y   
echo "jenkins installed"
#sudo service jenkins start
#echo "jenkins started"

