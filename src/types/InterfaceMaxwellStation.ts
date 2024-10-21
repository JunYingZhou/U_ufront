// 定义一个通用的 ID 接口，具有共享的结构
export interface EntityId {
  entityType: string;
  id: string;
}

// 定义主要的 MaxwellStation 接口
export interface MaxwellStation {
  id: EntityId;
  createdTime: number;
  tenantId: EntityId;
  customerId: EntityId;
  name: string;
  type: string;
  label: string;
  assetProfileId: EntityId;
  externalId: any; // 如果可能的话，考虑使用更具体的类型
  customerTitle: string;
  customerIsPublic: boolean;
  assetProfileName: string;
  additionalInfo: AdditionalInfo;
}

// 定义附加信息的接口
export interface AdditionalInfo {
  description: string;
}
