import os
import configparser
import sys
import json
import base64
import pyodbc
import xlsxwriter
import pandas as pd
from xlsxwriter.workbook import Workbook
from xlsxwriter.utility import xl_col_to_name
import numpy as np

pathCurrent = os.path.abspath(__file__ + "/../../../../../../")

config = configparser.ConfigParser()
config.read(pathCurrent+'/application/modules/main/configs/main.ini')

server = config['production']['resources.db.params.host'][1:-1]
database = 'cashier'
username = config['production']['resources.db.params.username'][1:-1] 
password = config['production']['resources.db.params.password'][1:-1]
cnxn = pyodbc.connect("Driver={SQL Server};"
                      "Server="+server+";Port=1433;"
                      "Database="+database+";"
                      "UID="+username+";"
                      "PWD="+password+";")

cursor = cnxn.cursor()

base64_file = sys.argv[1]
filename = sys.argv[2]

path = os.path.abspath(__file__ + "/../../../../../../")

f = open(path+'/public/app/gl/uploads/' + base64_file, 'r')
parameter = f.read()

obj = json.loads(base64.b64decode(parameter))

file_output = path+'/public/app/gl/uploads/' + filename;

wb = xlsxwriter.Workbook(file_output)

# styles
cell_format_header = wb.add_format({
    'bold': True,
    'font_size': 11,
    'font_color': '2F4F4F',
    'valign': 'vcenter'
})

for idx, o in enumerate(obj):
    
    sheet_title = o['title'];

    ws = wb.add_worksheet(sheet_title)

    content = o['contents']
    style = o['styles']
    header = content['header']
    headerTable = content['headerTable']
    column_config = content['column_config']
    hiddenColumns = content['hiddenColumns']

    # write header
    i = 0
    for h in header:
        ws.write_row(i, 0, h, cell_format_header)
        i = i + 1
    
    # write header table
    for idx, h in enumerate(headerTable):
        cell_format_headerTable = wb.add_format(style['headerTableStyle'][idx]);
        ws.write_row(i, 0, h, cell_format_headerTable)
        i = i + 1    

    raw_data = pd.read_sql(content['query'], cnxn)
    df = pd.DataFrame(raw_data, columns=content['column'])
    df = df.replace(np.nan, '')

    # print("data has been generated")

    begin_row_for_table_content = len(header) + len(headerTable)
    end_row_for_table_content = 0;

    data = df.values.tolist()

    # write content table
    for row_num, row_data in enumerate(data):
        row = begin_row_for_table_content + row_num 
        ws.write_row(row, 0, row_data)
        end_row_for_table_content = row

    # apply table configuration
    for idx, col in enumerate(content['column']):
        column_width = column_config['column_width'][col]
        column_align = column_config['column_align'][col]
        column_format = column_config['column_format'][col]
        
        col_format = {
            'valign': 'center',
            'align': column_align
        }

        if (column_format is not None):
            col_format['num_format'] = column_format

        cell_format_column = wb.add_format(col_format)

        # apply basic configuration (width, align, format, title)
        ws.set_column(idx, idx, column_width, cell_format_column)

    # apply conditional formatting
    for row_num, row_data in enumerate(data):

        for cf in style['setConditionalFormatting']:
            for k, v in cf.items():
                idx_from_col = content['column'].index(k)
                alphabet_col = xl_col_to_name(idx_from_col)
                alphabet_col_first = xl_col_to_name(0)
                alphabet_col_last = xl_col_to_name(len(content['column']) - 1)
                conditional_format = wb.add_format(v['format'])
                criteria_conditional_formatting = '=$' + alphabet_col + str(begin_row_for_table_content + row_num + 1) + v['operator'] + '"' + v['condition'] + '"'
                range_conditional_formatting = alphabet_col_first + str(begin_row_for_table_content + row_num  + 1) + ':' + alphabet_col_last + str(begin_row_for_table_content + row_num + 1)

                
                ws.conditional_format(range_conditional_formatting, {
                    'type': 'formula',
                    'criteria': criteria_conditional_formatting,
                    'format': conditional_format
                })

    # set to hide column
    for hc in hiddenColumns:
        ws.set_column(content['column'].index(hc), content['column'].index(hc), None, None, {'hidden': True})

wb.close()
print(filename)
