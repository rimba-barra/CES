Ext.define('Cashier.view.masterbudgetcashflow.FormData', {
    extend       : 'Cashier.library.template.view.FormData',
    alias        : 'widget.masterbudgetcashflowformdata',
    frame        : true,
    autoScroll   : true,
    anchorSize   : 100,
    bodyBorder   : true,
    bodyPadding  : 10,
    bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
    deletedRows  : [],
    editedRow    : -1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign    : 'left',
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
            items: [{
                    xtype : 'hiddenfield',
                    itemId: 'fdms_id',
                    name  : 'coa_config_id'
                },
                {
                    xtype           : 'textfield',
                    itemId          : 'fdms_department',
                    name            : 'department',
                    fieldLabel      : ' Department',
                    enforceMaxLength: true,
                    maskRe          : /[^\`\"\']/,
                    maxLength       : 50,
                    anchor          : '-5',
                    readOnly        : true,
                  
                },
                {
                    xtype           : 'textfield',
                    itemId          : 'fdms_cashflowtype',
                    name            : 'cashflowtype',
                    fieldLabel      : ' Cashflow Type',
                    enforceMaxLength: true,
                    maskRe          : /[^\`\"\']/,
                    maxLength       : 50,
                    anchor          : '-5',
                    readOnly        : true,
                  
                },
                {
                    xtype           : 'textfield',
                    name            : 'pt_name',
                    fieldLabel      : 'Company',
                    enforceMaxLength: true,
                    readOnly        : true,
                    maskRe          : /[^\`\"\']/,
                    maxLength       : 255,
                    anchor          : '-5'
                },
                {
                    xtype           : 'textfield',
                    name            : 'coa_name',
                    fieldLabel      : 'COA',
                    enforceMaxLength: true,
                    readOnly        : true,
                    maskRe          : /[^\`\"\']/,
                    maxLength       : 255,
                    anchor          : '-5'
                },
                {
                    xtype           : 'textfield',
                    name            : 'budget_type',
                    fieldLabel      : 'Budget Type',
                    enforceMaxLength: true,
                    readOnly        : true,
                    maskRe          : /[^\`\"\']/,
                    maxLength       : 255,
                    anchor          : '-5'
                },
                 {
                    xtype           : 'textfield',
                    name            : 'year',
                    fieldLabel      : 'Periode',
                    enforceMaxLength: true,
                    readOnly        : true,
                    maskRe          : /[^\`\"\']/,
                    maxLength       : 255,
                    anchor          : '-5'
                },
                
               {
                xtype     : 'fieldcontainer',
                layout    : 'hbox',
                bodyBorder: false,
                defaults  : {
                    layout: 'fit'
                },
                width: 300,
                items: [
                 
                        {
                            xtype           : 'xmoneyfield',
                            name            : 'total',
                            fieldLabel      : 'Total',
                            enforceMaxLength: true,
                            readOnly        : true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '300',
                            fieldStyle      : 'background-color:#eee;background-image: none;text-align:right;'
                           
                        },
 
                    ]
                },
                
                {
                xtype     : 'fieldcontainer',
                layout    : 'hbox',
                bodyBorder: false,
                defaults  : {
                    layout: 'fit'
                },
                width: 300,
                items: [
                 
                        {
                            xtype           : 'xmoneyfield',
                            name            : 'jan',
                            fieldLabel      : 'January',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype           : 'xmoneyfield',
                            name            : 'feb',
                            fieldLabel      : 'February',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },    
                    ]
                },
                
                
                {
                xtype     : 'fieldcontainer',
                layout    : 'hbox',
                bodyBorder: false,
                defaults  : {
                    layout: 'fit'
                },
                width: 300,
                items: [
                 
                         {
                            xtype           : 'xmoneyfield',
                            name            : 'mar',
                            fieldLabel      : 'March',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype           : 'xmoneyfield',
                            name            : 'apr',
                            fieldLabel      : 'April',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },  
                    ]
                },
                
                {
                xtype     : 'fieldcontainer',
                layout    : 'hbox',
                bodyBorder: false,
                defaults  : {
                    layout: 'fit'
                },
                width: 300,
                items: [
                 
                         {
                            xtype           : 'xmoneyfield',
                            name            : 'may',
                            fieldLabel      : 'May',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype           : 'xmoneyfield',
                            name            : 'jun',
                            fieldLabel      : 'June',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },  
                    ]
                },
                
                {
                xtype     : 'fieldcontainer',
                layout    : 'hbox',
                bodyBorder: false,
                defaults  : {
                    layout: 'fit'
                },
                width: 300,
                items: [
                 
                         {
                            xtype           : 'xmoneyfield',
                            name            : 'jul',
                            fieldLabel      : 'July',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype           : 'xmoneyfield',
                            name            : 'aug',
                            fieldLabel      : 'August',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },  
                    ]
                },
                
                {
                xtype     : 'fieldcontainer',
                layout    : 'hbox',
                bodyBorder: false,
                defaults  : {
                    layout: 'fit'
                },
                width: 300,
                items: [
                 
                         {
                            xtype           : 'xmoneyfield',
                            name            : 'sep',
                            fieldLabel      : 'September',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype           : 'xmoneyfield',
                            name            : 'oct',
                            fieldLabel      : 'October',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },  
                    ]
                },
                
                {
                xtype     : 'fieldcontainer',
                layout    : 'hbox',
                bodyBorder: false,
                defaults  : {
                    layout: 'fit'
                },
                width: 300,
                items: [
                 
                         {
                            xtype           : 'xmoneyfield',
                            name            : 'nov',
                            fieldLabel      : 'November',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },   
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype           : 'xmoneyfield',
                            name            : 'dec',
                            fieldLabel      : 'December',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            anchor          : '-5',
                            width           : '200'
                           
                        },  
                    ]
                },
                
             ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

