<?php
/**
 * Description of PlafonMixer
 *
 * @author MIS
 */
class Hrd_Models_Plafon_PlafonMixer {
    
    /*
     @return array
     */
    public static function mix($data){
        $hasil = array();
        
        foreach($data as $plafonValue){
         
            if($plafonValue instanceof Hrd_Models_Plafon_PlafonKaryawanValue){
               
                if($plafonValue->getType()->getId()==Box_Config::PLAFON_CEKUP){
                    $hasil["cekup"] = $plafonValue->getValue();
                }
                if($plafonValue->getType()->getId()==Box_Config::PLAFON_FRAME){
                    $hasil["frame"] = $plafonValue->getValue();
                }
                if($plafonValue->getType()->getId()==Box_Config::PLAFON_HAMIL){
                    $hasil["hamil"] = $plafonValue->getValue();
                }
                if($plafonValue->getType()->getId()==Box_Config::PLAFON_KB){
                    $hasil["kb"] = $plafonValue->getValue();
                }
                if($plafonValue->getType()->getId()==Box_Config::PLAFON_LAINLAIN){
                    $hasil["lainlain"] = $plafonValue->getValue();
                }
                if($plafonValue->getType()->getId()==Box_Config::PLAFON_LENSA){
                    $hasil["lensa"] = $plafonValue->getValue();
                }
                if($plafonValue->getType()->getId()==Box_Config::PLAFON_RAWATINAP){
                    $hasil["rawatinap"] = $plafonValue->getValue();
                }
                if($plafonValue->getType()->getId()==Box_Config::PLAFON_SALINABNORMAL){
                    $hasil["salinabnormal"] = $plafonValue->getValue();
                }
                if($plafonValue->getType()->getId()==Box_Config::PLAFON_SALINNORMAL){
                    $hasil["salinnormal"] = $plafonValue->getValue();
                }
            }
        }
       
        return $hasil;
    }
    
    /*
     @return Hrd_Models_Plafon_PlafonKaryawan
     */
    public static function unmix($data){
        $a = array(
            "cekup"=>  Box_Config::PLAFON_CEKUP,
            "frame"=>  Box_Config::PLAFON_FRAME,
            "hamil"=>  Box_Config::PLAFON_HAMIL,
            "kb"=>  Box_Config::PLAFON_KB,
            "lainlain"=>  Box_Config::PLAFON_LAINLAIN,
            "lensa"=>  Box_Config::PLAFON_LENSA,
            "rawatinap"=>  Box_Config::PLAFON_RAWATINAP,
            "salinabnormal"=>  Box_Config::PLAFON_SALINABNORMAL,
            "salinnormal"=>  Box_Config::PLAFON_SALINNORMAL);
        
        $plafon = new Hrd_Models_Plafon_PlafonKaryawan();
        
        foreach ($a as $k=>$v){
            if(key_exists($k,$data)){
                $pv = new Hrd_Models_Plafon_PlafonKaryawanValue();
                $pv->getType()->setId($v);
                $pv->setValue($data[$k]);
                $plafon->addDetail($pv);
            }
        }
        
        return $plafon;
    }
}

?>
