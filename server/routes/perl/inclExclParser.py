from subprocess import Popen, PIPE
file = open("./routes/perl/InclExcl/exclusion.txt", "r")
lines = file.readlines()
output = ""
for item in lines:
	stdout = Popen('echo ' + item.strip() + " | metamap -q -y" , shell=True, stdout=PIPE).stdout
	output += stdout.read()
file.close()
file = open("./routes/perl/InclExcl/exclusion-output.txt", "w")
file.write(output)
file.close()


file = open("./routes/perl/InclExcl/inclusion.txt", "r")
lines = file.readlines()
output = ""
for item in lines:
	stdout = Popen('echo ' + item.strip() + " | metamap -q -y" , shell=True, stdout=PIPE).stdout
	output += stdout.read()
file.close()

file = open("./routes/perl/InclExcl/inclusion-output.txt", "w")
file.write(output)
file.close()