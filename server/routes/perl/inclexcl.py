#!/usr/bin/python3

import sys, json, os

def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])


def main():
    #get our data as an array from read_in()
    lines = read_in()
    sort = lines.split(";")
    fileOutput = open(os.path.join(os.getcwd(),"routes","perl","InclExcl","exclusion.txt"), "w")
    fileInput = open(os.path.join(os.getcwd(),"routes","perl","InclExcl","inclusion.txt"), "w")
    fileOutput.write(sort[1])
    fileInput.write(sort[0])
    print("done")
    sys.stdout.flush()

#start process
if __name__ == '__main__':
    main()