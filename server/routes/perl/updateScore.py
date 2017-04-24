#!/usr/bin/env python

import xml.etree.ElementTree as ET
import os, sys
import pymongo

def openFile(filename, update):
	file = open(filename, "r")
	files = file.readlines()
	for item in files:
		update.append(item.strip().split())
	file.close()

def updateScore(update, collection):
    for file in update:
            filename = file[0]
            score = file[1]
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
	client = pymongo.MongoClient('localhost', 27017)
	db = client.records
	collection = db.records
	update = []
	openFile("./routes/perl/scores.txt",update)
	updateScore(update, collection)
	print("Done!")
	sys.stdout.flush()

main()
