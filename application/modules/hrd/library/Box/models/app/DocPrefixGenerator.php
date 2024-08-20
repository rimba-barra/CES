<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DocNumberGenerator
 *
 * @author MIS
 */
class Box_Models_App_DocPrefixGenerator {
    public static function get($name='DOC'){
        $text = "";
        $name = strlen($name)==0?"DOC":$name;
        $date = date("Y/m/d");
        $text = strtoupper($name)."/".$date;
        return $text;
        
    }
}

?>
