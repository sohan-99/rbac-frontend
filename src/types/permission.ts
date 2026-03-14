export type Permission = {
  key: string;
  label: string;
  module: string;
};

export type PermissionEditorItem = {
  key: string;
  name: string;
  granted: boolean;
  inherited: boolean;
  grantable: boolean;
};

export type UserPermissionEditorData = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'suspended' | 'banned';
  };
  directPermissions: string[];
  rolePermissions: string[];
  effectivePermissions: string[];
  grantablePermissions: string[];
  permissions: PermissionEditorItem[];
};