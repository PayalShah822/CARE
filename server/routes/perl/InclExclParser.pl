#!/usr/bin/perl


use strict;
use warnings;
use XML::Twig;
use Cwd qw();


#system "./bin/skrmedpostctl start";
#system "./bin/wsdserverctl start";
chdir("routes/perl/InclExcl");
if (!-e "outputs"){
	system "mkdir outputs";
}
my $path = Cwd::abs_path();

my $output1 = "exclusion.txt";
my $output2 = $output1;
$output2 =~ s/\.txt/\-output\.txt/;
my $outputFile = "outputs/" . $output2;
system "metamap -q -y $output1 $outputFile";

my $input1 = "inclusion.txt";
my $input2 = $input1;
$input2 =~ s/\.txt/\-output\.txt/;
my $inputFile = "outputs/" . $input2;
system "metamap -q -y $output1 $inputFile";



chdir("..");
#system "./bin/skrmedpostctl stop";
#system "./bin/wsdserverctl stop";
