Ext.define('Erems.store.Unitstatus', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.unitstatusstore',
    fields: [
        'unitstatus_id',
        'status'
    ],
    storeId: 'UnitstatusStore',
    data: [
			[1,'PLANNING'],
			[2,'STOCK-'],
			[3,'STOCK'],
			[4,'BOOKED'],
			[5,'SOLD'],
			[6,'PAID'],
			[7,'BLOCKED'],
			[8,'LEGAL'],
			[9,'CANCEL'],
			[10,'BROKEN UNIT'],
			[11,'HOLD'],
			[12,'GIVEN UNIT'],
		]
});