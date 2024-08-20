Ext.define('Cashier.view.reportchangepricelog.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.reportchangepricelogformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    id: 'reportchangepricelogID',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'tbspacer',
                height: 10
            }, {
                xtype: 'hiddenfield',
                name: 'hideparam',
                value: 'default'
            }, {
                xtype: 'panel',
                layout: 'vbox',
                bodyStyle: 'background-color:#dfe8f5;',
                border: false,
                padding: '0 0 0 20px',
                items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Project',
                    layout: 'hbox',
                    items: [{
                        xtype: 'projectcombobox',
                        fieldLabel: '',
                        emptyText: 'Select Project',
                        name: 'project_id',
                        allowBlank: false,
                        tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="250px" >',
                            '<tr class="x-grid-row">',

                            '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                        ),
                        enableKeyEvents : true,
                        queryMode: 'local',
                        forceSelection: true,
                        listeners: {
                            keyup: function (field) {
                                var searchString = field.getRawValue().toString().toLowerCase();
                                if(searchString == null){
                                    return false;
                                }
                                if (searchString) {
                                    this.store.filterBy(function (record, id) {
                                        if (record.get('projectname') == null) {
                                            return false;
                                        }else{
                                            if (record.get('projectname').toString().toLowerCase().indexOf(searchString) > -1) {
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
                    }, ]
                },]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                border: false,
                padding: '0 0 0 125px',
                bodyStyle: 'background: transparent',
                items: [{
                    xtype: 'button',
                    action: 'submit',
                    itemId: 'btnSubmit',
                    iconCls: 'icon-print',
                    text: 'Submit',
                    padding: 5,
                }, {
                    xtype: 'button',
                    action: 'cancel',
                    itemId: 'btnCancel',
                    iconCls: 'icon-cancel',
                    padding: 5,
                    text: 'Cancel',
                    margin: '0 0 0 10',
                    handler: function() {
                        this.up('window').close();
                    }
                }]
            }],
        });
        me.callParent(arguments);
    },
});