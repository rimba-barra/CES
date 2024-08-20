<?php

/**
 * Description of Remora
 * @Remora
 * Dengan interface ini otomatis mengisi data dari post data controller ke dalam object yang implement interface ini
 * @author MIS
 */
interface Cashier_Box_Kouti_Remora{
    function grouped();
    /*@params array $data*/
    function fillData($data);
}

?>
