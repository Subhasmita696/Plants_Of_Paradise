variable "resource_group_name" {
  description = "Name of the Azure resource group."
  type        = string
  default     = "paradise-plants-rg"
}

variable "location" {
  description = "Azure region for resources."
  type        = string
  default     = "eastus"
}

variable "aks_name" {
  description = "Name of the Azure Kubernetes Service cluster."
  type        = string
  default     = "paradise-plants-aks"
}

variable "acr_name" {
  description = "Name of the Azure Container Registry."
  type        = string
  default     = "paradiseplantsacr"
}

variable "admin_ssh_public_key" {
  description = "SSH public key for optional AKS node access. Leave empty to skip creating ssh access."
  type        = string
  default     = ""
}

variable "node_count" {
  description = "Number of nodes in the AKS node pool."
  type        = number
  default     = 3
}

variable "node_vm_size" {
  description = "VM size for AKS nodes."
  type        = string
  default     = "Standard_D4s_v3"
}

variable "tags" {
  description = "Tags to apply to Azure resources."
  type        = map(string)
  default = {
    project = "paradise-plants"
    owner   = "devops"
  }
}
