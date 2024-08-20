Ext.define('Hrd.view.companycherry.FormData', {
    alias: 'widget.companycherryformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
                {
                    xtype:'hiddenfield',
                    name:'company_id'
                },

                {
                    fieldLabel:'Company Code',
                    width:400,
                    name:'company_code',
                    readOnly: true,
                },

                {
                    xtype: 'combobox',
                    name: 'ptpt_id',
                    fieldLabel: 'Pt',
                    width:400,
                    displayField: 'ptpt_name',
                    valueField: 'ptpt_id',
                    readOnly: false,
                    allowBlank: true,
                    matchFieldWidth: false,
                    selectOnFocus :true,
                    queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px" >',
                      '<tr class="x-grid-row">',
                          '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                      '</tr>',
                      '<tpl for=".">',
                          '<tr class="x-boundlist-item">',
                              '<td><div class="x-grid-cell x-grid-cell-inner">{ptpt_name}</div></td>',                              
                            '</tr>',
                        '</tpl>',
                    '</table>'
                    )
                }

                // {
                //     xtype: 'combobox',
                //     name: 'projectpt_id',
                //     fieldLabel: 'Projectpt',
                //     width:400,
                //     displayField: 'project_name',
                //     valueField: 'projectpt_id',
                //     readOnly: false,
                //     allowBlank: true,
                //     matchFieldWidth: false,
                //     selectOnFocus :true,
                //     queryMode: 'local',
                //     tpl: Ext.create('Ext.XTemplate',
                //     '<table class="x-grid-table" width="500px" >',
                //       '<tr class="x-grid-row">',
                //           '<th width="100px"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
                //           '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                //       '</tr>',
                //       '<tpl for=".">',
                //           '<tr class="x-boundlist-item">',
                //               '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                //                 '<td><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',                              
                //             '</tr>',
                //         '</tpl>',
                //     '</table>'
                //     )
                // }
       
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'submit',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },{
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});