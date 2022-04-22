import { getConnection, Like, Repository } from 'typeorm';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { Project } from '../../domain/Project';
import { ProjectRepository } from '../../domain/ProjectRepository';
import { ProjectEntity } from './typeorm/ProjectEntity';

export class TypeOrmProjectRepository implements ProjectRepository {
  private repository: Repository<Project>;
  constructor() {
    this.repository = getConnection().getRepository(ProjectEntity);
  }
  async save(project: Project): Promise<void> {
    await this.repository.save(project);
  }
  async search(): Promise<Project[] | null | undefined> {
    const projects = await this.repository.find();
    return projects;
  }
  async searchByMember(Member: Uuid): Promise<Project[] | null | undefined> {
    const projects = await this.repository.find({
      where: [{ creator: Like(`%${Member.value}%`) }, { collaboratorsIds: Like(`%${Member.value}%`) }]
    });
    return projects;
  }

  async searchOneBy(id: Uuid): Promise<Project | null | undefined> {
    const project = await this.repository.findOne({ id });
    return project;
  }
}
