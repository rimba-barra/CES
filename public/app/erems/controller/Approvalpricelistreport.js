Ext.define('Erems.controller.Approvalpricelistreport', {
	extend : 'Erems.library.template.controller.Controllerpopup',
	alias  : 'controller.Approvalpricelistreport',
	views  : ['approvalpricelistreport.Panel', 'approvalpricelistreport.Grid', 'approvalpricelistreport.FormData', 'approvalpricelistreport.FormSearchheader'],
	stores : ['Approvalpricelistreport'],
	models : ['Approvalpricelist'],
	refs   : [
		{
			ref      : 'grid',
			selector : 'approvalpricelistreportgrid'
		},
		{
			ref      : 'formsearchheader',
			selector : 'approvalpricelistreportformsearchheader'
		}
	],
	controllerName : 'approvalpricelistreport',
	fieldName      : '',
	bindPrefixName : 'Approvalpricelistreport',
	init           : function (application) {
		var me = this;
		this.control({
			'approvalpricelistreportpanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'approvalpricelistreportgrid': {
				afterrender : this.gridAfterRender,
				cellclick   : function(view, cell, indxC, rec, row, indxR, ev, h){
					this.expandRow(rec, row);
				}
			},
			'approvalpricelistreportgrid actioncolumn': {
				afterrender : this.gridActionColumnAfterRender,
			},
			'approvalpricelistreportformsearchheader button[action=search]' : {
				click : this.dataSearch
			},
			'approvalpricelistreportformsearchheader button[action=reset]' : {
				click : this.dataReset
			},
			'approvalpricelistreportformsearchheader button[action=export_excel]' : {
				click : this.exportExcel
			},
			'approvalpricelistreportgrid button[action=export_excel]' : {
				click : this.exportExcel
			}
		});
	},
	gridAfterRender : function(){
		this.callParent(arguments);

		var me = this;
		
   		var tm = setTimeout(function(){
	   		if(me.getGrid().getStore().getCount()){
				me.getGrid().down('[action=export_excel]').setVisible(true);
				me.getFormsearchheader().down('[action=export_excel]').setVisible(true);
	   		}
	   		clearTimeout(tm);
   		}, 500);
	},
	panelAfterRender : function(el){
		Ext.get('WINDOW-mnu' + this.bindPrefixName).setWidth(935);
	},
	expandRow : function(rec, row){
		var me = this;
		var expandId  = 'x-grid-row-internalId-'+rec.internalId;
		var rowExpand = $('#'+expandId);
		if(rowExpand.html() == undefined){
            me.getGrid().up('window').body.mask('Loading Detail Approval Pricelist, please wait ...');
			Ext.Ajax.request({
				url     : 'erems/approvalpricelist/read',
				params  : {mode_read : "getHtmlemail", pricelist_id : rec.get('pricelist_id'), 'status' : rec.get('doc_status')},
				success : function (rsp) {
	                var res = Ext.decode(rsp.responseText);
	                if(res.success){
	                	$('#'+row.id).after('<tr id="'+expandId+'"><td colspan="6" style="padding:10px 5px 10px 50px;border:1px solid #c3c3c3;"><div>' + Ext.decode(res.html) + '</di></td></tr>');
	                }
	                me.getGrid().up('window').body.unmask();
	            },
				failure : function (e) {
	                me.getGrid().up('window').body.unmask();
					Ext.Msg.show({
						title   : 'Failure',
						msg     : 'Error: Informasi Data Pricelist Gagal.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
				}
	        });
        }

        var eTarget = Ext.get(row).query('img.x-action-col-0')[0];
        var m = eTarget.className.match(/\bicon-expand-(\w+)\b/);
        if(m != null){
	        var icnPrv = 'icon-expand-up';
	        var icnNxt = 'icon-expand-down';
	        if(m[1] == 'down'){
				icnPrv = 'icon-expand-down';
				icnNxt = 'icon-expand-up';

        		rowExpand.show();
	        }
	        else{
        		rowExpand.hide();
	        }
	        eTarget.classList.remove(icnPrv);
	        eTarget.classList.add(icnNxt);
        }
	},
	gridActionColumnAfterRender: function(el) {
		var me = this, actitem = el.items;
        Ext.each(actitem, function(item, index) {
            if (item.iconCls) {
                item.getClass = function(v, meta, rec) {
                    return 'ux-actioncolumn ' + item.iconCls;
                }
            }
        });
    },
    exportExcel : function(){
		var me = this;
		var f  = me.getFormsearchheader();
		var g  = me.getGrid();

    	var params = {
			mode_read         : "export_excel", 
			status            : f.down('[name=status]').getValue(),
			modul             : f.down('[name=modul]').getValue(),
			periode_startdate : f.down('[name=periode_startdate]').getValue(),
			periode_enddate   : f.down('[name=periode_enddate]').getValue(),
			mode_sp           : 'report'
    	};

    	Ext.Ajax.request({
			url     : 'erems/approvalpricelist/read',
			params  : params,
			success : function (rsp) {
                var res = Ext.decode(rsp.responseText);

                var url = res.URL;
                if (url) {
                    Ext.Msg.show({
						title   : 'Info',
						msg     : '<a href="' + url + '" target="blank">Download file</a>',
						icon    : Ext.Msg.INFO,
						buttons : Ext.Msg.OK,
						fn      : function() {

                        }
                    });
                }
                else{
                	Ext.Msg.show({
						title   : 'Failure',
						msg     : 'Error: Export data pricelist Gagal.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
                }
                g.up('window').body.unmask();
            },
			failure : function (e) {
                g.up('window').body.unmask();
				Ext.Msg.show({
					title   : 'Failure',
					msg     : 'Error: Export data pricelist Gagal.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
        });
    },
});