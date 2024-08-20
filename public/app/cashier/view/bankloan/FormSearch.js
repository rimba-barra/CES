Ext.define('Cashier.view.bankloan.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.bankloanformsearch',
    uniquename: '_bankloan',
    id: 'bankloanformsearchID',
    initComponent: function () {
        var me = this;
        var date = new Date();

        var year = [];
        for (var i = (date.getFullYear()-5); i <= date.getFullYear(); i++) {
            year.push(
                {'tahun_id' : i, 'txt': i}
            );
        }

        // console.log(year);
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                /*{
                    xtype: 'ptusercombobox',
                    itemId: 'fs_pt_id'+me.uniquename,
                    id: 'pt_id'+me.uniquename,
                    name: 'pt_id',
                    fieldLabel: 'PT / Company',
                    emptyText: 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    width: 100
                },*/
                {
                    xtype: 'ptcustomcombobox',
                    itemId: 'fs_projectpt_id'+me.uniquename,
                    id: 'projectpt_id'+me.uniquename,
                    name: 'projectpt_id',
                    fieldLabel: 'PT / Company',
                    emptyText: 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    width: 100
                },
                {
                    xtype: 'subholdingcombobox',
                    itemId: 'fs_subholding_id'+me.uniquename,
                    id: 'subholding_id'+me.uniquename,
                    name: 'subholding_id',
                    fieldLabel: 'Subholding',
                    emptyText: 'Subholding',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    width: 100,
                    readOnly: true,
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Start Periode',
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'bulan_start',
                            fieldLabel: '',
                            queryMode: 'local',
                            valueField: 'bulan_id',
                            // value: (date.getMonth()+1),
                            forceSelection: true,
                            displayField: 'txt',
                            width: 132,
                            enforceMaxLength: true,
                            store: new Ext.data.JsonStore({
                                fields: ['bulan_id', 'txt'],
                                data: [
                                    {bulan_id: 1, txt: 'Januari'},
                                    {bulan_id: 2, txt: 'Februari'},
                                    {bulan_id: 3, txt: 'Maret'},
                                    {bulan_id: 4, txt: 'April'},
                                    {bulan_id: 5, txt: 'Mei'},
                                    {bulan_id: 6, txt: 'Juni'},
                                    {bulan_id: 7, txt: 'Juli'},
                                    {bulan_id: 8, txt: 'Agustus'},
                                    {bulan_id: 9, txt: 'September'},
                                    {bulan_id: 10, txt: 'Oktober'},
                                    {bulan_id: 11, txt: 'November'},
                                    {bulan_id: 12, txt: 'Desember'},
                                ]
                            }),
                            autoSelect:true,
                            listeners: {
                                afterrender: function() {
                                // this.setValue(this.value);    
                                }
                            }
                        },
                        {
                            xtype: 'splitter',
                            width: '5'
                        },
                        {
                            xtype: 'combobox',
                            name: 'tahun_start',
                            fieldLabel: '',
                            queryMode: 'local',
                            valueField: 'tahun_id',
                            // value: date.getFullYear(),
                            forceSelection: true,
                            displayField: 'txt',
                            width: 132,
                            enforceMaxLength: true,
                            store: new Ext.data.JsonStore({
                                fields: ['tahun_id', 'txt'],
                                data: year
                            }),
                            autoSelect:true,
                            listeners: {
                                afterrender: function() {
                                // this.setValue(this.value);    
                                }
                            }
                        },
                    ],
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'End Periode',
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'bulan_end',
                            fieldLabel: '',
                            queryMode: 'local',
                            valueField: 'bulan_id',
                            // value: (date.getMonth()+1),
                            forceSelection: true,
                            displayField: 'txt',
                            width: 132,
                            enforceMaxLength: true,
                            store: new Ext.data.JsonStore({
                                fields: ['bulan_id', 'txt'],
                                data: [
                                    {bulan_id: 1, txt: 'Januari'},
                                    {bulan_id: 2, txt: 'Februari'},
                                    {bulan_id: 3, txt: 'Maret'},
                                    {bulan_id: 4, txt: 'April'},
                                    {bulan_id: 5, txt: 'Mei'},
                                    {bulan_id: 6, txt: 'Juni'},
                                    {bulan_id: 7, txt: 'Juli'},
                                    {bulan_id: 8, txt: 'Agustus'},
                                    {bulan_id: 9, txt: 'September'},
                                    {bulan_id: 10, txt: 'Oktober'},
                                    {bulan_id: 11, txt: 'November'},
                                    {bulan_id: 12, txt: 'Desember'},
                                ]
                            }),
                            autoSelect:true,
                            listeners: {
                                afterrender: function() {
                                // this.setValue(this.value);    
                                }
                            }
                        },
                        {
                            xtype: 'splitter',
                            width: '5'
                        },
                        {
                            xtype: 'combobox',
                            name: 'tahun_end',
                            fieldLabel: '',
                            queryMode: 'local',
                            valueField: 'tahun_id',
                            // value: date.getFullYear(),
                            forceSelection: true,
                            displayField: 'txt',
                            width: 132,
                            enforceMaxLength: true,
                            store: new Ext.data.JsonStore({
                                fields: ['tahun_id', 'txt'],
                                data: year
                            }),
                            autoSelect:true,
                            listeners: {
                                afterrender: function() {
                                // this.setValue(this.value);    
                                }
                            }
                        },
                    ],
                }
            ],
            dockedItems: me.generateDockedItems(),
        });

        me.callParent(arguments);
    }
});