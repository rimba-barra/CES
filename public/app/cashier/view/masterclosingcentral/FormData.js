Ext.define('Cashier.view.masterclosingcentral.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterclosingcentralformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    width: 300,
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
            items: [{
                xtype: 'hiddenfield',
                itemId: 'ptid',
                name: 'pt_id'
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                bodyBorder: false,
                defaults: {
                    layout: 'fit'
                },
                width: 200,
                items: [
                {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_projectpt_id',
                    id: 'ptmasterclosingcentral1',
                    itemId: 'ptmasterclosingcentral1',
                    forceSelection: true,
                    allowBlank: false,
                    readOnly: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    queryMode: 'local',
                    flex: 2,
                    rowdata: null,
                    matchFieldWidth: false,
                    typeAhead: false,
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
                            // listConfig: {
                                listeners: {
                                    itemclick: function(list, record) {
                                        //alert(this.project_id);
                                        var pt_id = record.get('pt_id');
                                        var project_project_id = record.get('project_project_id');
                                        localStorage.setItem("current_pt_id", pt_id);
                                        localStorage.setItem("current_project_id", project_project_id);
                                    },
                                    keyup: function (field) {
                                        var searchString = field.getRawValue().toString().toLowerCase();
                                        if(searchString == null){
                                            return false;
                                        }
                                        if (searchString) {
                                            this.store.filterBy(function (record, id) {
                                                if (record.get('name') == null || record.get('code') == null) {
                                                    return false;
                                                }else{
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
                                                }
                                                
                                            });
                                        }
                                    },
                                    buffer: 300,
                                },

                            // },
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            action: 'action1',
                            align: 'right',
                            width: 80,
                            margin: '0 5 0 0',
                            text: '<div style="width:15px;height:15px;background-color:red;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Closed',
                        },
                        {
                            xtype: 'button',
                            action: 'action2',
                            align: 'right',
                            width: 80,
                            margin: '0 5 0 0',
                            text: '<div style="width:15px;height:15px;background-color:green;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Opened',
                        },
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        width: 100,
                        items: [
                        {
                            xtype: 'combobox',
                            name: 'year',
                            fieldLabel: 'Periode',
                            displayField: 'year',
                            valueField: 'year',
                            id: 'yearclosing1',
                            itemId: 'yearclosing1',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                        },
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        width: 100,
                        items: [
                        {
                            xtype: 'combobox',
                            name: 'unclosemethod',
                            fieldLabel: 'Unclose Method',
                            displayField: 'unclosemethod',
                            valueField: 'idmethod',
                            id: 'unclosemethod1',
                            itemId: 'unclosemethod1',
                            queryMode: 'local',
                            dvalue: 'DEFAULT',
                            store:['DEFAULT','SELECTED MONTH ONLY'],
                            allowBlank: false,
                            forceSelection: true,
                            listeners: {
                                afterrender: function() {
                                 this.setValue(this.dvalue);    
                             }
                         }
                     },
                     ]
                 },
                 {
                    xtype: 'button',
                    action: 'select',

                    padding: 5,
                    width: 75,
                    flex: 1,
                    maxWidth: 75,
                    iconCls: 'icon-search',
                    text: 'Refresh',
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
                    {
                        xtype: 'button',
                        action: 'save', cls: 'btnMonth', month: 'jan',
                        padding: 5,
                        width: 100,
                            // id: 'btnJanId',
                            height: 90, disabled: true,
                            text: 'January',
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'save', cls: 'btnMonth', month: 'feb',
                            padding: 5,
                            width: 100,
                            height: 90, disabled: true,
                            text: 'February'
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'save', cls: 'btnMonth', month: 'mar',
                            padding: 5,
                            width: 100,
                            height: 90, disabled: true,
                            text: 'March'
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'save', cls: 'btnMonth', month: 'apr',
                            padding: 5,
                            width: 100,
                            height: 90, disabled: true,
                            text: 'April'
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'save', cls: 'btnMonth', month: 'may',
                            padding: 5,
                            width: 100,
                            height: 90, disabled: true,
                            text: 'May'
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'save', cls: 'btnMonth', month: 'jun',
                            padding: 5,
                            width: 100,
                            height: 90, disabled: true,
                            text: 'June'                       },
                            ]
                        },
                ///
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
                    {
                        xtype: 'button',
                        action: 'save', cls: 'btnMonth', month: 'jul',
                        padding: 5,
                        width: 100,
                        height: 90, disabled: true,
                        text: 'July'
                    },
                    {
                        xtype: 'splitter',
                        width: '10'
                    },
                    {
                        xtype: 'button',
                        action: 'save', cls: 'btnMonth', month: 'aug',
                        padding: 5,
                        width: 100,
                        height: 90, disabled: true,
                        text: 'August'
                    },
                    {
                        xtype: 'splitter',
                        width: '10'
                    },
                    {
                        xtype: 'button',
                        action: 'save', cls: 'btnMonth', month: 'sep',
                        padding: 5,
                        width: 100,
                        height: 90, disabled: true,
                        text: 'September'
                    },
                    {
                        xtype: 'splitter',
                        width: '10'
                    },
                    {
                        xtype: 'button',
                        action: 'save', cls: 'btnMonth', month: 'oct',
                        padding: 5,
                        width: 100,
                        height: 90, disabled: true,
                        text: 'October'
                    },
                    {
                        xtype: 'splitter',
                        width: '10'
                    },
                    {
                        xtype: 'button',
                        action: 'save', cls: 'btnMonth', month: 'nov',
                        padding: 5,
                        width: 100,
                        height: 90, disabled: true,
                        text: 'November'
                    },
                    {
                        xtype: 'splitter',
                        width: '10'
                    },
                    {
                        xtype: 'button',
                        action: 'save', cls: 'btnMonth', month: 'dec',
                        padding: 5,
                        width: 100,
                        height: 90, disabled: true,
                        text: 'December',
                            // id: 'dec'                       
                        },
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
            padding: 6,
            type: 'hbox'
        },     items: [
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

