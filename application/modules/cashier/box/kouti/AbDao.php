<?php

/**
 * Description of AbDao
 *
 * @author MIS | Tommy Toban
 * @abstract AbDao
 * 
 */
abstract class Cashier_Box_Kouti_AbDao {

    protected $interHasil; /* must Cashier_Box_Kouti_InterHasil */

    /* @return void */

    protected function bindHasil($mode = 0, $hasilFromDao) {
        if ($mode == 0) {

            $this->bindRead($hasilFromDao);
        }
    }

    private function bindRead($hasilFromDao) {
        $interHasil = $this->interHasil;
        $x = $interHasil->getTypeHasil();
        if (count($x) == 0)
            return $interHasil;
        $foundKey = "";
        foreach ($x as $k => $v) {
            foreach ($hasilFromDao as $ke => $va) {
                if (is_array($va) && count($va) > 0) {
                    if (count($va[0]) == 1 && key_exists($k, $va[0])) {
                        $x[$k] = $va[0][$k];
                        $foundKey = $k; // totalRow
                    } else if ($k != $foundKey && !key_exists($foundKey, $va[0])) {
                        $x[$k] = $va;
                    }
                }
            }
        }
        $this->interHasil->setTypeHasil($x);
    }
    
    protected final function toDateTime($date){
        $date = (string)$date;
        $x = '';
        if(strlen($date)>0){
            $x = date('Y-m-d h:m:s', strtotime($date));
        }
        return $x;
    }
    
    

    private function bindSaveUpdate() {
        
    }

}

?>
