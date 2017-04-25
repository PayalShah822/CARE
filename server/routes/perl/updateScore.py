#!/usr/bin/env python

import os, sys
import pymongo

def getSyn(filename):
	file = open(filename, "r")
	lst = file.readlines()
	for i in range(len(lst)):
		lst[i] = lst[i].strip()
	file.close()
	return lst
def getScore(filename, incl, excl):
	file = open(filename, "r").read().lower()
	score = 0
	for word in incl:
		score += file.count(word.lower())
	for word in excl:
		score -= file.count(word.lower())
	return score

def getAllScores(incl, excl, update):
	for root, dirnames, files in os.walk('./routes/perl/xml/outputs/datastructures_outputs'):
		for name in files:
			score = getScore('./routes/perl/xml/outputs/datastructures_outputs/' + name, incl, excl)
			update[name.strip("-DSoutput.xml")] = score

		break

def updateScore(update, collection):
	for filename,score in update.items():
		p = collection.find_one({'name':filename})
		if(p!= None):
			collection.update_one(
				{
		  		'_id': p['_id']
				},{
			  		'$set': {
			    	'grade': score
			  		}
				}, upsert=False)

def main():
	update = {}
	excl = getSyn("./routes/perl/InclExcl/excl.txt")
	incl = getSyn("./routes/perl/InclExcl/incl.txt")
	getAllScores(incl,excl,update)
	client = pymongo.MongoClient('localhost', 27017)
	db = client.records
	collection = db.records
	updateScore(update, collection)
	print("Done!")
	sys.stdout.flush()

main()
