<?php

/**
 * Description of Config
 *
 * @author MIS
 */
class Box_Models_App_Config {

    private static $variable = array(
        /* id dari spktype yang nilainya "UNIT" */
        "spk_type_id_unit"=>2,
        "SPK_TYPE_NONUNIT_ID"=>1,
        "spk_status"=>array(
            "open"=>array(1,"OPEN"),
            "close"=>array(2,"CLOSE"),
            "cancel"=>array(3,"CANCEL")
        ),
        "payment_flag"=>array(
            "others"=>array(2,"OTHERS")
        ),
        "SPK_MAX_UNIT_NUMBER"=>2,
        "SPK_MAX_EACH_UNIT"=>2,
        "SPK_ACTIVE_EACH_UNIT"=>1,
        "UNITSTATUS_AVAILABLE"=>1,
        "UNITSTATUS_STOCK"=>4,
        "UNITSTATUS_SOLD"=>2,
        "PAYMENTMETHOD_CASH"=>4,
        "SCHEDULETYPE_ID"=>array(
            "cash"=>1,"kpr"=>2,"inh"=>3,"tandajadi"=>4,"uangmuka"=>5
        ),
        "PRICETYPEID_KPR"=>2,
        "PAYMENTFLAG_SCHEDULE"=>1,
        "PAYMENTFLAG_OTHERS"=>2,
        "PAYMENTFLAG_NONLINK"=>3
    );

    public static function getv($name) {
        return self::$variable[$name];
   
    }
    public static function geto($name){
        return new Box_Models_App_Config_Helper(self::$variable[$name]);
    }
    
   

}
?>
