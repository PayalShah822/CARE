#!/usr/bin/perl

use strict;
use warnings;
use MetaMap::DataStructures;

chdir("routes/perl/InclExcl");
my %params = ();
my $datastructures = MetaMap::DataStructures->new(\%params); 
open(IN, "<", "inclusion-output.txt") or die "Can't open inclusion file: $!";

my $outFileName = "InclSyn.txt";
open (OUT, ">", $outFileName) ||  die "Could not open output file for inclusion";

my $input = '';
print STDERR "Reading Input\n";

while(<IN>) {
    chomp $_;
	$input .= $_;
	$input =~ s/00000000\.tx\./00000000\.ti\./gi;
	if ($_ eq "\'EOU\'.") {
		$datastructures->createFromText($input);
	}
}	

my $citations = $datastructures->getCitations();

foreach my $key (keys %{$citations}) {
	my $citation = ${$citations}{$key};
	my $utterancesRef = $citation->getOrderedUtterances();
	print OUT  "\n";
	print OUT  "\nUtterance toStrings\n";
	$utterancesRef = $citation->getOrderedUtterances();
	
	foreach my $utterance(@{$utterancesRef}) {
		print OUT  $utterance->toString();
	}

	print STDERR "DONE!, results written to $outFileName\n";
}
close(IN);
close(OUT);

##########################################################################################
my $new_datastructures = MetaMap::DataStructures->new(\%params); 
open (IN, "<", "exclusion-output.txt") or die "Can't open exclusion file: $!";

my $exFileName = "ExclSyn.txt";
open (OUT, ">", $exFileName) ||  die "Could not open output file for exclusion";

$input = '';
print STDERR "Reading Input\n";

while(<IN>) {
    chomp $_;
	$input .= $_;
	$input =~ s/00000000\.tx\./00000000\.ti\./gi;
	if ($_ eq "\'EOU\'.") {
		$new_datastructures->createFromText($input);
	}
}	

my $new_citations = $new_datastructures->getCitations();

foreach my $key (keys %{$new_citations}) {
	my $new_citation = ${$new_citations}{$key};
	my $new_utterancesRef = $new_citation->getOrderedUtterances();
	print OUT  "\n";
	print OUT  "\nUtterance toStrings\n";
	$new_utterancesRef = $new_citation->getOrderedUtterances();
	
	foreach my $new_utterance(@{$new_utterancesRef}) {
		print STDERR $new_utterance;
		print OUT  $new_utterance->toString();
	}

	print STDERR "DONE!, results written to $exFileName\n";
}
close(IN);
close(OUT);


##########################################################################################

open (IN, "<", "InclSyn.txt") or die "Can't open inclusion file: $!";
open(OUT, ">", "incl.txt") or die "Can't open exclusion file: $!";
while(<IN>) {
    chomp $_;
	if ($_ =~ /C\d\d\d\d\d\d\d\,(.*)\s\-1000/) {
		my $syn = $1;
		my @values = split('\,', $syn);
		@values = grep /\S/, @values;
		foreach my $val (@values) {
			$val =~ s/^\s+|\s+$//g;
			$val =~ s/\'//g;
			$val =~ s/-//gi;
			$val =~ s/^\s+|\s+$//g;
			print "$val\n";
			print OUT "$val\n";
		}
	}
}
close(IN);
close(OUT);
open(OUT, ">", "excl.txt") or die "Can't open exclusion file: $!";
open (IN, "<", "ExclSyn.txt") or die "Can't open exclusion file: $!";

while(<IN>) {
    chomp $_;
	if ($_ =~ /C\d\d\d\d\d\d\d\,(.*)\s\-1000/) {
		my $syn = $1;
		my @values = split('\,', $syn);
		@values = grep /\S/, @values;
		foreach my $val (@values) {
			$val =~ s/^\s+|\s+$//g;
			$val =~ s/\'//g;
			$val =~ s/-/ /gi;
			$val =~ s/^\s+|\s+$//g;
			print "$val\n";
			print OUT "$val\n";
		}
	}
}

close(IN);








##########################################################################################

#chdir("..");
#chdir("..");
#chdir("xml");
#chdir("outputs");

#opendir(DH, "datastructures_outputs");
#my @files = readdir(DH);
#closedir(DH);

#foreach my $file (@files)
#{
#	print STDERR "$file\n";
#}