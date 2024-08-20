<?php

class Cashier_Box_Library_Cleansing {

    public static function clean_str($string){
        $unique = array(
            ['char'=>'\xE2\x80\x8C', 'replace'=>' '], 
            ['char'=>'Â€“', 'replace'=> '-'], 
            ['char'=>'“', 'replace'=> '"'], 
            ['char'=>'”', 'replace'=> '"'], 
            ['char'=>'²', 'replace'=> ' persegi'],
            ['char'=>'Â', 'replace'=> '~'], 
            ['char'=>'\xa0', 'replace'=> ''], 
        );

        for ( $i = 0; $i < count($unique); $i++) { 
            if (strpos($string, $unique[$i]['char']) !== false ) {
                $string = str_replace($unique[$i]['char'], $unique[$i]['replace'], $string);
            }
        }

        return $string;
    }

    public static function clean_str2($string){

        $string = preg_replace('/0x[8-9a-fA-F]/', '', $string);

        $arr_string = str_split($string);

        for( $i = 0; $i < sizeof($arr_string); $i++ ){
            $temp = "0x".dechex(ord($arr_string[$i]));
            if( preg_match('/0x[8-9a-fA-F]/', $temp) == 1 && $temp != '0xa'){
                // $arr_string[$i] = preg_replace('/0x[8-9a-fA-F]/', '', $arr_string[$i]);
                // unset($arr_string[$i]);
                $arr_string[$i] = '';
            }
        }

        $string = implode($arr_string);

        return $string;
    }

}

?>
