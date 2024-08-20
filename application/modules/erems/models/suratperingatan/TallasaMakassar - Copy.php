<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LosariMakassar
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_TallasaMakassar extends Erems_Models_Suratperingatan_Default {
    public function getHTML(){
        return '<style>
	table {
    border-collapse: collapse;
}



table, td, th {
    border: 1px solid black;
	font-size:12px;
}
td{
	padding:2px 10px;
}



    p.spstyle_p{
        font-size: 12px;
    }
	p.spstyle_p_small{
        font-size: 8px;
	
    }
</style>
<p class="spstyle_p" align="right">Jonggol, <b>{{tanggal_print}}</b></p>
<br/>
<br/>
<br/>
<br/>
<br/>
<p class="spstyle_p">No. Ref : <b>{{nomor_sp_teratas}}</b><br/>
    Hal : Pemberitahuan ke <b>{{sp_surat_ke}}</b></p>

<p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
    Bapak/Ibu <b>{{customer_name}}</b><br/>
    {{customer_address}}</p>

<p class="spstyle_p">Dengan Hormat,<br/>
    Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling  <b>{{unit_number}}</b> di Citra Indah Jonggol. Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:<br/>
<br/>
{{{list_tagihan}}}
<br/>
Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat datang langsung ke Kantor Pemasaran Citra Indah atau dengan mentransfer ke rekening :<br/>
<br/>
CIPUTRA TALLASA JOINT OPERATION , Bank Mandiri Cab. Kartini, Makassar, A/c No. 152.00.2558888.6<br/>
atas nama Ciputra Tallasa Joint Operation atau ke Marketing Gallery CitraLand Tallasa City Makassar<br/>
Jl. Jendral Sudirman Kav.32-33, Jakarta 10220<br/>
Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat difax ke no. 021-89932023 dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag.Collection).<br/>
Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
<br/><br/>
Hormat Kami,</br>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
Daniar Akhmad Akhiri (FC)<br/>
--------------------------------------<br/>
cc : Sofyan Khabib (Sales Coordinator)<br/>
{{salesman_name}} (Sales)<br/>
</p>

<p class="spstyle_p_small"><u>*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</u></p>



';
    }
    
    // public function getListTagihanHTML($params){
        // $schedule = $params["schedule"][0];
        // $total = 0.0;
     
        
        // $table = "<table width='500'>";
        // foreach($schedule as $row){
      
            // $table .="<tr><td class='full'>Angsuran ".$row["scheduletype"]." Ke - ".$row["termin"]."</td><td class='rp'>Rp.</td><td align='right' class='price'>".Erems_Box_Tools::toCurrency($row["remaining_balance"])."</td></tr>";
             // $table .="<tr><td>Angsuran Ke - </td><td> Rp. ".$row["remaining_balance"]." </td></tr>";
            // $total += $row["remaining_balance"];
            
        // }
        
        // $table .= "<tr><td class='full'><b>Total yang harus dibayarkan</b></td><td class='rp'>Rp.</td><td align='right' class='price'><b>".Erems_Box_Tools::toCurrency($total)."</b></td></tr>";
        // $table .="</table>";
        // return $table;
    // }
	
    public function getListTagihanHTML($params){
        $schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb=0;
        $ttlremaining_balance=0;
        $table = "";

        foreach($schedule as $row){
            if($row['indicatorname'] == 'denda'){
                $denda = $row["remaining_denda"];
            }else{
                $denda = $row["denda_terlambatb"];
            }
            $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
            $table .='<tr>
                        <td>'.$row["scheduletype"].'</td>
                        <td>'.$row["termin"].'</td>
                        <td>'.date('d-m-Y',strtotime($row["duedate"])).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]).'</td>
                        <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> 
                        <td align="right">Rp. '.number_format($denda).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]+$denda).'</td>
                    </tr>';
        }

        $table .='<tr><td>&nbsp</td><td>&nbsp</td><td>Total </td><td align="right">Rp. '.number_format($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td align="right">Rp. '.number_format($ttldenda_terlambatb).'</td><td align="right">Rp. '.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

        return $table;
    }
    
	public function getHTMLdefault(){
       return $this->getHTML();
    }
      
}
