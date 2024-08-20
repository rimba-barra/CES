Ext.define('Hrd.view.reloadpm.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.reloadpmgrid',
    storeConfig: {
        id: 'ReloadpmGridStore',
        idProperty: 'employee_id',
        extraParams: {}
    },
    bindPrefixName: 'Reloadpm',
    newButtonLabel: 'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width: 75
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [{
                    xtype: 'rownumberer'
                }, {
                    dataIndex: 'employee_nik',
                    text: 'NIK'
                }, {
                    dataIndex: 'employee_name',
                    text: 'Employee Name',
                    width: 200
                }, {
                    dataIndex: 'department',
                    text: 'Department',
                    width: 200
                }, {
                    dataIndex: 'banding',
                    text: 'Banding',
                    width: 100
                }, {
                    dataIndex: 'jobfamily',
                    text: 'Job Family',
                    width: 100
                }, {
                    dataIndex: 'periode',
                    text: 'Periode',
                    width: 80
                }, {
                    dataIndex: 'status_pm',
                    text: 'Status PM',
                    width: 170,
                    renderer: function(val, meta, rec) {
                        // draft : #d81b60
                        // submit : #00a65a
                        // approve : #605ca8
                        // commitee closed : #001f3f                        
                        var status_id = parseInt(rec.get('status_id'));
                        if( status_id === 0 || status_id === 3 || status_id === 6 || status_id === 9 || status_id === 12 || status_id === 15 ){
                            val = '<div style="background-color:#d81b60; color:#fff; padding:5px; white-space: normal;" align=center>' + val + '<div />';
                            
                        } else if ( status_id === 1 || status_id === 4 || status_id === 7 || status_id === 10 || status_id === 13 || status_id === 16){
                            val = '<div style="background-color:#00a65a; color:#fff; padding:5px; white-space: normal;" align=center>' + val + '<div />';    
                            
                        } else if ( status_id === 2 || status_id === 5 || status_id === 8 || status_id === 11 || status_id === 14){
                            val = '<div style="background-color:#605ca8; color:#fff; padding:5px; white-space: normal;" align=center>' + val + '<div />';             
                            
                        } else if ( status_id === 17){
                            val = '<div style="background-color:#001f3f; color:#fff; padding:5px; white-space: normal;" align=center>' + val + '<div />';                              
                        }
                        return val;
                    }
                }, {
                    header: 'Competency',
                    width: 80,
                    sortable: false,
                    dataIndex: 'employee_nik',
                    renderer: function(val, meta, rec) {
                        return '<div style="background-color:#b5b8bb; padding:5px; white-space: normal;" align=center>Reload<div />';
                        //return '<input type="button" value="&nbsp; Reload &nbsp;" id="competency_' + val + '" />';
                    }
                }, {
                    header: 'Package Doc.',
                    width: 80,
                    sortable: false,
                    dataIndex: 'employee_nik',
                    renderer: function(val, meta, rec) {
                        return '<div style="background-color:#b5b8bb; padding:5px; white-space: normal;" align=center>Reload<div />';
                        //return '<input type="button" value="&nbsp; Reload &nbsp;" id="packagedoc_' + val + '" />';
                    }
                },/*
                {
                    header: 'Reload',
                    width: 125,
                    sortable: false,
                    renderer: function(val,meta,rec) {
                       var id = Ext.id();
                       console.log(id);
                       Ext.defer(function() {
                          Ext.widget('button', {
                             //renderTo: id,
                             text: 'DELETE',
                             scale: 'small',
                             handler: function() {
                                me.fireEvent('deleteRecord', me, rec);
                             }
                          });
                       }, 150);
                       return Ext.String.format('<div id="{0}"></div>', id);
                    }
                },*/
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [{
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: []
            }, {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }];

        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: []
        };

        return ac;
    }
});