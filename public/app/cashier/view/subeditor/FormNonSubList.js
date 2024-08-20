Ext.define('Cashier.view.subeditor.FormNonSubList', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.subeditorformnonsublist',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_fdsubeditorformnonsublist",
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'journalsubdetail_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'coa' + me.uniquename,
                    name: 'coa',
                },
                {
                    xtype : 'textareafield',
                    id: 'keterangan' + me.uniquename,
                    grow : true,
                    name : 'keterangan',
                    height: 110,
                    readOnly: true,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var me = this;
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        align: 'right',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        items: [
                            {
                                xtype: 'tbspacer', height: 5
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                align: 'right',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype: 'subglcombobox',
                                        fieldLabel: '',
                                        itemId: 'fd_subgl_id' + me.uniquename,
                                        id: 'subgl_id' + me.uniquename,
                                        name: 'subgl_id',
                                        emptyText: 'Select Sub Code..',
                                        width: 335,
                                        allowBlank: false,
                                        enforceMaxLength: true,
                                        enableKeyEvents: true,
                                        rowdata: null,
                                        queryMode: 'remote',
                                        minChars: 2,
                                        forceSelection:true,
                                        typeAhead:false,
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'generatesubtrans',
                                        itemId: 'btnGenerateSubTrans',
                                        text: 'Generate Sub Trans',
                                        margin: '0 0 0 2.5',
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ];
        return x;
    }
});

