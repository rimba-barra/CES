import pyodbc
import configparser
import sys
import json
import collections
import datetime
import decimal
import xlsxwriter
import time
import os

def default(o):
    if isinstance(o, (datetime.date, datetime.datetime)):
        return o.isoformat()
    if isinstance(o, decimal.Decimal):
        return float(o)

args = sys.argv[1]
fileNameRequest = sys.argv[2]
userId = sys.argv[3]
secondsSinceEpoch = int(time.time())

pathCurrent = os.path.abspath(__file__ + "/../../../../../")

config = configparser.ConfigParser()
config.read(pathCurrent+'/application/modules/main/configs/main.ini')

server = config['production']['resources.db.params.host'][1:-1]
database = 'erems'
username = config['production']['resources.db.params.username'][1:-1] 
password = config['production']['resources.db.params.password'][1:-1]
cnxn = pyodbc.connect("Driver={SQL Server};"
                      "Server="+server+";Port=1433;"
                      "Database="+database+";"
                      "UID="+username+";"
                      "PWD="+password+";")
                      # "Trusted_Connection=yes;")
cursor = cnxn.cursor()
cursor.execute(args)
data = cursor.fetchall()
columns = [column[0] for column in cursor.description]
cnxn.close()
# countdata = len(data)

fileName = fileNameRequest+'_'+str(secondsSinceEpoch)+'_'+str(userId)+'.xlsx'
newFilePath = pathCurrent+'/public/app/erems/uploads/msexcel/'+fileName

# Create an new Excel file and add a worksheet.
workbook = xlsxwriter.Workbook(newFilePath)
worksheet = workbook.add_worksheet()

i=0
for column in columns:
	worksheet.write(0, i, column)
	i += 1

i=1
for row in data:
	j = 0
	# d = collections.defaultdict()
	for column in columns:
		# d[column] =  row[j]
		worksheet.write(i, j, row[j])
		j+=1
	i += 1

workbook.close()
# print(os.listdir('../../../../'))
print(fileName)

# results = []
# for row in data:
# 	i = 0
# 	d = collections.defaultdict()
# 	for column in columns:
# 		d[column] =  row[i]
# 		i += 1
# 	results.append(d)
# j = json.dumps(results, default=default)
# with open("pythonResult/"+args, "w") as f:
#     f.write(j)