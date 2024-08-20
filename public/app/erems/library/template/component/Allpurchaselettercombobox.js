Ext.define('Erems.library.template.component.Allpurchaselettercombobox', {
	extend           : 'Erems.library.component.Combobox',
	alias            : 'widget.allpurchaselettercombobox',
	store            : 'Allpurchaseletter',
	fieldLabel       : 'Purchaseletter',
	displayField     : 'display_field', //mengambil data dari store
	valueField       : 'purchaseletter_id', //mengambil data dari store
	matchFieldWidth  : false,
	typeAhead        : true,
	fieldLabel       : 'Purchaseletter',
	itemId           : 'fd_purchaseletter',
	name             : 'purchaseletter_id_cb',
	emptyText        : 'Choose Purchaseletter',
	enforceMaxLength : true,
	enableKeyEvents  : true,
	rowdata          : null,
	tpl              : Ext.create(
		'Ext.XTemplate',
		'<table class="x-grid-table" width="500" >',
		'<tr class="x-grid-row">',
		'<th width="30%"><div class="x-column-header x-column-header-inner">Nomor Pesanan</div></th>',
		'<th width="20%"><div class="x-column-header x-column-header-inner">Tanggal Pesanan</div></th>',
		'<th width="50%"><div class="x-column-header x-column-header-inner">Customer</div></th>',
		'</tr>',
		'<tpl for=".">',
		'<tr class="x-boundlist-item">',
		'<td align="left"><div class="x-grid-cell x-grid-cell-inner">{purchaseletter_no}</div></td>',
		'<td align="left"><div class="x-grid-cell x-grid-cell-inner">{display_firstpurchase_date}</div></td>',
		'<td align="left"><div class="x-grid-cell x-grid-cell-inner">{customer_name}</div></td>',
		'</tr>',
		'</tpl>',
		'</table>'
	),
	listeners : {
        beforequery: function(record){
            record.query = new RegExp(record.query, 'i');
            record.forceAll = true;
        },
        select: function(a,b) {
        	var pExp = this.rawValue.split(' ');
        	this.inputEl.dom.value = pExp[0];
        },
        change : function(a,b) {
        	var pExp = this.rawValue.split(' ');
        	this.inputEl.dom.value = pExp[0];
        },
        blur : function(a,b){
        	var pExp = this.rawValue.split(' ');
        	this.inputEl.dom.value = pExp[0];
        },
        expand : function(a,b){
        	var pExp = this.rawValue.split(' ');
        	this.inputEl.dom.value = pExp[0];
        },
        render: function(el){
	        el.getEl().down('input').on({
				scope : el,
				click : function(){
					var pExp = this.rawValue.split(' ');
        			this.inputEl.dom.value = pExp[0];
	            },
	        });

	        el.getEl().down('.x-trigger-index-0').on({
				scope : el,
				click : function(){
					var pExp = this.rawValue.split(' ');
        			this.inputEl.dom.value = pExp[0];
				},
	        });
	    },
    },
	initComponent: function () {
		var me = this;
		me.callParent(arguments);
	},
})