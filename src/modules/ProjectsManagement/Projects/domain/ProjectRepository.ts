import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { Project } from './Project';

export interface ProjectRepository {
  save(project: Project): Promise<void>;
  delete(id: Uuid): Promise<void>;
  search(): Promise<Project[] | undefined | null>;
  searchByMember(Member: Uuid): Promise<Project[] | undefined | null>;
  searchOneBy(id: Uuid): Promise<Project | undefined | null>;
}
