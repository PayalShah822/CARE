#!/usr/bin/perl


use strict;
use warnings;
use XML::Twig;


chdir("routes/perl");
if (!-e "InclExcl"){
	system "mkdir InclExcl";
}
if (!-e "xml"){
	system "mkdir xml";
}
chdir("xml");
system "ls > files.txt";
if (!-e "outputs"){
	system "mkdir outputs";
}

open(my $fh, "<", "files.txt") or die "Can't open file: $!";

my $twig;
my $output;
my $command;
while (my $line = <$fh>) {
	if ($line =~ m/files.txt/ || $line =~ m/output/) {
	}
	else {
		chomp $line;
		$twig = XML::Twig -> new (
			pretty_print => 'indented',
			twig_handlers =>{
				TAGS => sub{
					$_->set_text("")->flush();
				}
			}
		);
		$twig->parsefile_inplace ($line);
		$output = $line;
		$output =~ s/\.xml/\-output\.xml/;
		$output = "outputs/" . $output;
		if(! -e $output) {
			system "metamap -q -y $line $output";
		}
	}
}



chdir("..");

