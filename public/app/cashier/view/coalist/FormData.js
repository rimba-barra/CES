Ext.define('Cashier.view.coalist.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.coalistformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },        
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'PT/Company',
                    layout: 'hbox',
                    items: [
                        {
                            // xtype: 'ptcombobox',
                            xtype: 'projectptcombobox',
                            fieldLabel: '',
                            emptyText: 'Select Data',
                            name: 'pt_id',
                            allowBlank: false,
                            queryMode: 'local',
                            forceSelection: true,
                            rowdata: null,
                            allowBlank: false,
                            enableKeyEvents: true,
                            tpl: Ext.create('Ext.XTemplate',
                                '<table class="x-grid-table" width="500px">',
                                '<tr class="x-grid-row">',
                                '<th width="50px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                                '<th width="190px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                '</tr>',
                                '<tpl for=".">',
                                '<tr class="x-boundlist-item">',
                                '<td ><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
                                '<td ><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                                '<td ><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                '</tr>',
                                '</tpl>',
                                '</table>'
                                ),
                            listeners: {
                                keyup: function (field) {
                                    var searchString = field.getRawValue().toString().toLowerCase();
                                    if(searchString == null){
                                        return false;
                                    }
                                    if (searchString) {
                                        this.store.filterBy(function (record, id) {
                                            if (record.get('ptname') == null || record.get('ptcode') == null) {
                                                return false;
                                            }else{
                                                if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                                    return true;
                                                    this.store.clearFilter(true);
                                                } else if (record.get('ptcode').toString().toLowerCase().indexOf(searchString) > -1) {
                                                    return true;
                                                    this.store.clearFilter(true);
                                                } else {
                                                    return false;
                                                    this.store.clearFilter(true);
                                                }    
                                            }

                                        });
                                    }
                                },
                                buffer:300
                            }
                        }
                    ]
                },     
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '5px 0px 0px 80px',
                    bodyStyle:'background-color:#dfe8f5', 
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-print',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text: 'Cancel',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
