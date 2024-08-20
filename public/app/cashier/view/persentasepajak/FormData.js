Ext.define('Cashier.view.persentasepajak.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.persentasepajakformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
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
                anchor: '97%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_persentasepajak_id',
                    name: 'persentasepajak_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam'
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel:'Project',
                    emptyText: 'Select Project',
                    name: 'project_id',
                    allowBlank: false,
                    enableKeyEvents: true,
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
                    )
                },
                {
                    xtype: 'ptprojectcombobox',
                    fieldLabel:'PT',
                    emptyText: 'Select PT',
                    name: 'pt_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'mastertipepajakcombo',
                    fieldLabel:'Tipe Pajak',
                    emptyText: 'Select Tipe Pajak',
                    name: 'tipepajakdetail_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'NPWP',
                    columns: 3,
                    vertical: true,
                    allowBlank: false,
                    margin: '10 0 0 0',
                    items: [
                        { boxLabel: 'Ada', name: 'is_npwp', inputValue: 1, checked: true },
                        { boxLabel: 'Tidak Ada', name: 'is_npwp', inputValue: 0 }
                    ]
                },
                {
                    xtype: 'kelaskontraktorcombobox',
                    fieldLabel:'Kelas Kontraktor',
                    emptyText: 'Select Kelas Kontraktor',
                    name: 'kelaskontraktor_id',
                    allowBlank: true,
                    enableKeyEvents: true,
                    margin: '9 0 0 0'
                },
                {
                    xtype: 'tipekontraktorcombobox',
                    fieldLabel:'Tipe Kontraktor',
                    emptyText: 'Select Tipe Kontraktor',
                    name: 'tipekontraktor_id',
                    allowBlank: true,
                    enableKeyEvents: true,
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    anchor: '100%',
                    items: [
                        {
                            xtype: 'numberfield',
                            name: 'persentase',
                            fieldLabel: 'Persentase',
                            minValue: 0,
                            anchor: '40%',
                            allowBlank: false,
                            margin: '10 0 0 0'
                        },
                        {
                            xtype: 'label',
                            text: '%',
                            margin: '13 7 0 0'
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
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
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
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

