export interface VoucherEntities {
        "id": number,
        "voucher_id": number,
        "client_id": number,
        "created_at": string,
        "updated_at": string,
        "voucher": {
            "id": number,
            "name": string,
            "start_date": string,
            "end_date": string,
            "lifetime": string,
            "download": string,
            "download_unit": string,
            "upload": string,
            "upload_unit": string,
            "price": number,
            "type": string,
            "start_date_formatted": string,
            "end_date_formatted": string,
            "lifetime_humans": string,
            "lifetime_clock": string
        },
        "client": {
            "id": number,
            "name": string
        }    
}


export interface  VoucherDetailEnt {
    "id": number,
    "name": string,
    "start_date": string,
    "end_date": string,
    "lifetime": string,
    "download": string,
    "download_unit": string,
    "upload": string,
    "upload_unit": string,
    "price": number,
    "type": string,
    "start_date_formatted": string,
    "end_date_formatted": string,
    "lifetime_humans": string,
    "lifetime_clock": string
}