Ext.define('Cashier.view.mastertemplate.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.mastertemplateformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    minHeight: 150,
    maxHeight: 220,
    autoHeight: true,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'combobox',
                    name: 'project_id',
                    itemId: 'fmis_project_id',
                    fieldLabel: 'Project',
                    displayField: 'project_name',
                    valueField: 'project_project_id',
                    width: '300',
                    queryMode: 'local',
                    allowBlank: false,
                    msgTarget: "side",
                    enforceMaxLength: true,
                    blankText: 'This should not be blank!',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                  
                    items: [
                        
                        {
                            xtype: 'combobox',
                            name: 'pt_id',
                            fieldLabel: 'Company',
                            displayField: 'name',
                            valueField: 'pt_id',
                            flex: 2,
                            allowBlank: false,
                            readOnly: false,
                            enforceMaxLength: true,
                            queryMode: 'local',
                            matchFieldWidth: false,
                            tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="500px">',
                                    '<tr class="x-grid-row">',
                                    '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                    '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                                    '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                            absoluteReadOnly: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            forceSelection: false,
                            typeAhead: false,
                            listeners: {
                                keyup: function (field) {
                                    var searchString = field.getValue();
                                    if (searchString) {
                                        this.store.filterBy(function (record, id) {
                                            if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                                                return true;
                                                this.store.clearFilter(true);
                                            } else {
                                                return false;
                                                this.store.clearFilter(true);
                                            }
                                        });
                                    }
                                },
                                buffer: 300,
                            },
                        },
//                {
//                xtype: 'button',
//                action: 'selectyear',
//                itemId: 'btnSelectYearid',
//                padding: 5,
//                width: 150,
//                maxWidth:150,
//                iconCls: 'icon-save',
//                text: 'Year',
//                align:'right',
//                cls:'btnYear',
//                disabled:true,
//                },


                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'template_id',
                    fieldLabel: 'Template',
                    displayField: 'name',
                    valueField: 'template_id',
                    readOnly: false,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    flex: 2,
                    forceSelection: true,
                    typeAhead: false,
                    queryMode: 'local',
                },
                {
                    xtype: 'splitter',
                    height: '20'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                    ]
                },
            ],
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    type: 'hbox'
                }, items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        itemId: 'btnSelecsstArkawasan',
                        id: 'btnselec32tid',
                        padding: 5,
                        width: 125,
                        flex: 1,
                        maxWidth: 125,
                        iconCls: 'icon-search',
                        text: 'Load Template',
                        disabled: true,
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});

