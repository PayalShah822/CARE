#!/usr/bin/perl

use strict;
use warnings;

use MetaMap::DataStructures;


chdir("routes/perl/xml/outputs");
system "ls > outputFiles.txt";
if (!-e "datastructures_outputs"){
	system "mkdir datastructures_outputs";
}


open(my $fh, "<", "outputFiles.txt") or die "Can't open file: $!";

while (my $inFileName = <$fh>) {
	
	if($inFileName =~ m/outputFiles.txt/ || $inFileName =~ m/datastructures_outputs/){
	}
	else{
		my %params = ();
		my $datastructures = MetaMap::DataStructures->new(\%params); 
		chomp $inFileName;
		open(IN, "<", $inFileName) || die "Can't open input file";
		my $outFileName = $inFileName;
		$outFileName =~ s/output\.xml/DSoutput\.xml/;
		$outFileName = "datastructures_outputs/" . $outFileName;
		if(!-e $outFileName){
			open (OUT, ">", $outFileName) ||  die "Could not open output file";

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


			print OUT  "\n\n---------  Citations Results  ----------------\n\n"; 
			print OUT  "numCitations = ".(scalar keys %{$citations})."\n";
			print OUT  "begin listing citations:\n";
			print OUT "---------------------------------------------------------------\n\n";
			foreach my $key (keys %{$citations}) {

			    my $citation = ${$citations}{$key};

			    print OUT  "PMID = $citation->{id}\n";
			    
			    print OUT  "-------------Utterances-----------------------\n";
			    my $utterancesRef = $citation->getOrderedUtterances();
			    foreach my $utterance(@{ $utterancesRef }) {
				print OUT  $utterance->{id}."*";
			    }
			    print OUT  "\n";

			    print OUT  "-------------Tokens-----------------------\n";
			    my $tokensRef = $citation->getOrderedTokens();
			    foreach my $token(@{ $tokensRef }) {
				print OUT  $token->{text}.'*';
			    }
			    print OUT  "\n";
			    print OUT  "-------------Concepts-----------------------\n";
			    my $conceptsListsRef = $citation->getOrderedConcepts();
			    foreach my $conceptListRef(@{ $conceptsListsRef }) {
				foreach my $concept(@{ $conceptListRef }) {
				    print OUT  $concept->{text}.'*';
				}
				print OUT  "\n";
			    }
			    print OUT  "\n";
			    print OUT  "-------------Unique Concepts-----------------------\n";
			    my %uniqueConcepts = %{ $citation->getUniqueConcepts() };
			    print OUT "Number of unique Concepts = ".(scalar keys %uniqueConcepts)."\n";
			    foreach my $key(keys %uniqueConcepts) {
				print OUT  "$key - $uniqueConcepts{$key}->{text}\n";
			    }
			    print OUT  "--------------- Mappings ---------------------\n";
			    my $mappingsRef = $citation->getOrderedMappings();
			    foreach my $mapping(@{ $mappingsRef }) {
				print OUT  "|";
				foreach my $c(@{ $mapping->{concepts} }) {
				    my $text = $c->{text};
				    print OUT  "*$text";
				}
				print OUT  "|\n";
			    }
			    print OUT  "\n";

			    print OUT  "-------------Other-----------------------\n";
			    print OUT  "Citation has title? - ".$citation->hasTitle()."\n";
			    print OUT  "Citation has abstract? - ".$citation->hasAbstract()."\n";
			    print OUT  "Citation Title: ";
			    $tokensRef = $citation->getTitle()->getOrderedTokens();
			    foreach my $token(@{$tokensRef}) {
				print OUT  $token->{text}.'*';
			    }
			    print OUT  "\n";
			    print OUT  "Citation Abstract: ";
			    $tokensRef = $citation->getAbstract()->getOrderedTokens();
			    foreach my $token(@{$tokensRef}) {
				print OUT  $token->{text}.'*';
			    }
			    print OUT  "\n";

			    print OUT  "--------------  Final Other --------------------\n";
			    my $conceptsRef = $citation->getConcepts();
			    print OUT  "Citation equals itself?: ".$citation->equals($citation)."\n";
			    print OUT  "Citation equals its title?: ".$citation->equals($citation->getTitle())."\n";
			    print OUT  "Citation equals its abstract?: ".$citation->equals($citation->getAbstract())."\n";
			    print OUT  "Citation contains one of its own concepts?: ".($citation->contains(${$conceptsRef}[0]->{cui}))."\n";
			    print OUT  "Citation contains a concept that it doesn't contain?: ".$citation->contains('1')."\n";

			    print OUT  "\nUtterance toStrings\n";
			    $utterancesRef = $citation->getOrderedUtterances();
			    foreach my $utterance(@{$utterancesRef}) {
				print OUT  $utterance->toString();
			    }
			    
			    print OUT  "\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n\n";

			    print STDERR "DONE!, results written to $outFileName\n";
			}
		}
	}
}