Ext.define('Cashier.view.masterbudgetcoa.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterbudgetcoaformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 200,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow :-1,
    initComponent: function() {
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
                    itemId: 'fdms_id',
                    name: 'budget_id'
                },
                {
                    xtype: 'textfield',
                    name: 'pt_name',
                    fieldLabel: 'Project / PT',
                    enforceMaxLength: true,
                    readOnly:true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 255,
                    anchor: '-10'
                },
                {
                    xtype: 'textfield',
                    name: 'year',
                    fieldLabel: 'Periode',
                    enforceMaxLength: true,
                    readOnly:true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 255,
                    anchor: '40%'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    anchor: '-10',
                    items: [
                 
                        {
                            xtype: 'textfield',
                            name: 'coa',
                            fieldLabel: 'COA',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            width: '41%',
                            readOnly: true
                        }, 
                        {
                            xtype: 'textfield',
                            name: 'description',
                            fieldLabel: '&nbsp',
                            labelSeparator: ' ',
                            labelWidth: 0,
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            width: '58.5%',
                            margin: '0 0 0 5',
                            readOnly: true
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
                    anchor: '-10',
                    items: [
                 
                        {
                            xtype: 'textfield',
                            name: 'department_code',
                            fieldLabel: 'Department',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            width: '41%',
                            readOnly: true
                        }, 
                        {
                            xtype: 'textfield',
                            name: 'department_name',
                            fieldLabel: '&nbsp',
                            labelSeparator: ' ',
                            labelWidth: 0,
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            width: '58.5%',
                            margin: '0 0 0 5',
                            readOnly: true
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
                width: 300,
                items: [
                 
                        {
                            xtype: 'xmoneyfield',
                            name: 'total',
                            fieldLabel: 'Yearly Budget',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '300'
                           
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
                width: 300,
                items: [
                 
                        {
                            xtype: 'xmoneyfield',
                            name: 'jan',
                            fieldLabel: 'January',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'feb',
                            fieldLabel: 'February',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
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
                width: 300,
                items: [
                 
                         {
                            xtype: 'xmoneyfield',
                            name: 'mar',
                            fieldLabel: 'March',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'apr',
                            fieldLabel: 'April',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
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
                width: 300,
                items: [
                 
                         {
                            xtype: 'xmoneyfield',
                            name: 'may',
                            fieldLabel: 'May',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'jun',
                            fieldLabel: 'June',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
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
                width: 300,
                items: [
                 
                         {
                            xtype: 'xmoneyfield',
                            name: 'jul',
                            fieldLabel: 'July',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'aug',
                            fieldLabel: 'August',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
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
                width: 300,
                items: [
                 
                         {
                            xtype: 'xmoneyfield',
                            name: 'sep',
                            fieldLabel: 'September',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'oct',
                            fieldLabel: 'October',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
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
                width: 300,
                items: [
                 
                         {
                            xtype: 'xmoneyfield',
                            name: 'nov',
                            fieldLabel: 'November',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'dec',
                            fieldLabel: 'December',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50,
                            anchor: '-5',
                            width: '200'
                           
                        },  
                    ]
                },
                
             ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

