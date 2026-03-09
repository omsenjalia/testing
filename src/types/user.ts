export type User = {
  id: string
  username: string          // e.g. "kislay"
  name: string              // e.g. "Kislay"
  avatar: string            // absolute image URL
  location: string          // human-readable, e.g. "Bengaluru, India"
  lat: number               // latitude
  lng: number               // longitude
  tagline: string           // short bio / product tagline
  productsCount: number     // number of products shipped
  profileUrl: string        // https://buildinprocess.com/@username
}
