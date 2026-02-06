package com.etimeshouse.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateOrderRequest {

    @NotBlank(message = "L'adresse de livraison est requise")
    @Size(max = 500, message = "L'adresse de livraison est trop longue")
    private String shippingAddress;

    @NotBlank(message = "La ville de livraison est requise")
    @Size(max = 100, message = "La ville est trop longue")
    private String shippingCity;

    @NotBlank(message = "Le code postal est requis")
    @Size(max = 20, message = "Le code postal est trop long")
    private String shippingPostalCode;

    @NotBlank(message = "Le pays de livraison est requis")
    @Size(max = 100, message = "Le pays est trop long")
    private String shippingCountry;
}

