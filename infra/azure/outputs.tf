output "resource_group_name" {
  description = "The resource group created for Azure infrastructure."
  value       = azurerm_resource_group.main.name
}

output "location" {
  description = "Azure region used for infrastructure."
  value       = azurerm_resource_group.main.location
}

output "aks_name" {
  description = "The Azure Kubernetes Service cluster name."
  value       = azurerm_kubernetes_cluster.aks.name
}

output "acr_name" {
  description = "The Azure Container Registry name."
  value       = azurerm_container_registry.acr.name
}

output "acr_login_server" {
  description = "The ACR login server."
  value       = azurerm_container_registry.acr.login_server
}

output "aks_identity_principal_id" {
  description = "Managed identity principal id for AKS."
  value       = azurerm_kubernetes_cluster.aks.identity[0].principal_id
}
