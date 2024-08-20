Ext.define('Hrd.view.absentrecord.FormToolTransfer', {
    alias: 'widget.absentrecordformtooltransfer',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: '',
                            // Arrange radio buttons into two columns, distributed vertically
                            itemId: 'modeTransferID',
                            labelWidth: 1,
                            width: '100%',
                            layout: 'hbox',
                            defaults: {
                                margin: '0 7 0 0'
                            },
                            flex: 3,
                            items: [
                                {boxLabel: 'Database', name: 'mode_transfer', inputValue: "D", checked: true},
                                {boxLabel: 'CSV', name: 'mode_transfer', inputValue: "C"},
                                {boxLabel: 'Excel', name: 'mode_transfer', inputValue: "E"},
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    itemId:'transferDateID',
                    defaults: {
                        xtype: 'datefield',
                        labelWidth: 50,
                        format: 'd/m/Y',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: 'From',
                            name: 'start_day',
                            value: new Date(),
                            listeners:{
                                select: function(el, newValue, oldValue, eOpts) {
                                    var today = new Date(); 
                                    var from  = me.down('[name=start_day]').getValue();
                                    var to    = me.down('[name=end_day]').getValue();

                                    var day   = Math.abs(moment(from).diff(to, 'day'));
                                    var month = Math.abs(moment(from).diff(to, 'month'));
                                    var year  = Math.abs(moment(today).diff(from, 'year'));

                                    if(year == 0 || year == 1){
                                        if(day > 31){
                                            Ext.Msg.show({
                                                 title:'WARNING',
                                                 msg: 'From date and To date must be between 31 days.',
                                                 buttons: Ext.Msg.OK,
                                                 icon: Ext.Msg.WARNING
                                            });
                                        }
                                    }else{
                                        Ext.Msg.show({
                                             title:'WARNING',
                                             msg: 'From date maximum one year from today.',
                                             buttons: Ext.Msg.OK,
                                             icon: Ext.Msg.WARNING
                                        });
                                    }
                                }
                            }
                        },
                        {
                            fieldLabel: 'To',
                            name: 'end_day',
                            labelWidth: 20,
                            margin: '0 0 0 20px',
                            value: new Date(),
                            listeners:{
                                select: function(el, newValue, oldValue, eOpts) {
                                    var today = new Date(); 
                                    var from  = me.down('[name=start_day]').getValue();
                                    var to    = me.down('[name=end_day]').getValue();

                                    var day   = Math.abs(moment(from).diff(to, 'day'));
                                    var month = Math.abs(moment(from).diff(to, 'month'));
                                    var year  = Math.abs(moment(today).diff(to, 'year'));

                                    if(year == 0 || year == 1){
                                        if(day > 31){
                                            Ext.Msg.show({
                                                 title:'WARNING',
                                                 msg: 'From date and To date must be between 31 days.',
                                                 buttons: Ext.Msg.OK,
                                                 icon: Ext.Msg.WARNING
                                            });
                                        }
                                    }else{
                                        Ext.Msg.show({
                                             title:'WARNING',
                                             msg: 'From date maximum one year from today.',
                                             buttons: Ext.Msg.OK,
                                             icon: Ext.Msg.WARNING
                                        });
                                    }
                                }
                            }
                        }
                    ]

                },
                {
                    xtype: 'checkbox',
                    name: 'delete',
                    inputValue: '1',
                    boxLabel: 'Delete temporary absent',
                    hidden:true // added by rico 15022024
                },
                {
                    hidden:true,
                    xtype: 'filefield',
                    fieldLabel: 'CSV File',
                    itemId: 'file_csvabsent',
                    name: 'csv_transfer',
                },
                
                // added by Wulan 24.04.2018
                {
                    hidden:true,
                    xtype: 'label',
                    name: 'description_format',
                    itemId: 'description_format',
                    html: 'Format csv adalah sbb : <br>Kolom 1 : Pin Number <br>Kolom 2 : Nama <br>Kolom 4 : Tanggal dengan format dd-mm-yyyy atau dd/mm/yyyy <br>Kolom 10 : Jam dengan format hh:mm'
                },
                {
                    hidden:true,
                    xtype: 'filefield',
                    fieldLabel: 'Excel File',
                    itemId: 'file_excelabsent',
                    name: 'excel_transfer',
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            hidden:true,
                            xtype:'button',
                            fieldLabel:' ',
                            text:'Download Template',
                            itemId: 'download_template_excel',
                            action:'download_template_excel'
                        }
                    ]
                },
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
                        action: 'process',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                    {
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