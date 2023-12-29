import { DataSource, EntityTarget } from 'typeorm';

export async function destroyConnection(conn: DataSource): Promise<void> {
  await conn.dropDatabase();
  await conn.destroy();
}
