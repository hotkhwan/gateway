// src/lib/utils/asset.ts
export type AssetHelper = (path: string) => string

export function createAssetHelper(base = ''): AssetHelper {
    return (path: string) =>
        path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
}
