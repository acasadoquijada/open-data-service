import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Pipeline from './pipeline'
import * as RestService from './pipelineRest'
import NotificationConfig from '@/pipeline/notifications/notificationConfig'

@Module({ namespaced: true })
export default class PipelineModule extends VuexModule {

  private pipelines: Pipeline[] = []
  private selectedPipeline: Pipeline = {} as unknown as Pipeline
  private isLoadingPipelines = true

  @Mutation
  public setPipelines (pipelines: Pipeline[]): void {
    this.pipelines = pipelines
    this.isLoadingPipelines = false
  }

  @Mutation
  public setSelectedPipeline (pipeline: Pipeline): void {
    this.selectedPipeline = pipeline
  }

  @Mutation
  public setIsLoadingPipelines (value: boolean): void {
    this.isLoadingPipelines = value
  }

  @Action({ commit: 'setPipelines', rawError: true })
  public async loadPipelines (): Promise<Pipeline[]> {
    this.context.commit('setIsLoadingPipelines', true)

    return await RestService.getAllPipelines()
  }

  @Action({ commit: 'setSelectedPipeline', rawError: true })
  public async loadPipelineById (id: number): Promise<Pipeline> {
    return await RestService.getPipelineById(id)
  }

  @Action({ commit: 'setSelectedPipeline', rawError: true })
  public async loadPipelineByDatasourceId (datasourceId: number): Promise<Pipeline> {
    return await RestService.getPipelineByDatasourceId(datasourceId)
  }


  @Action({ commit: 'setPipelines', rawError: true })
  public async createPipeline (pipeline: Pipeline): Promise<Pipeline[]> {
    await RestService.createPipeline(pipeline)
    return await RestService.getAllPipelines()
  }

  @Action({ commit: 'setPipelines', rawError: true })
  public async updatePipeline (pipeline: Pipeline): Promise<Pipeline[]> {
    await RestService.updatePipeline(pipeline)
    return await RestService.getAllPipelines()
  }

  @Action({ commit: 'setPipelines', rawError: true })
  public async deletePipeline (pipelineId: number): Promise<Pipeline[]> {
    await RestService.deletePipeline(pipelineId)
    return await RestService.getAllPipelines()
  }

  @Action({ commit: 'setSelectedPipeline', rawError: true })
  public async addNotification (notification: NotificationConfig): Promise<Pipeline> {
    const newPipeline: Pipeline = Object.assign({}, this.selectedPipeline)
    newPipeline.notifications.push(Object.assign({}, notification))
    await RestService.updatePipeline(newPipeline)
    return await RestService.getPipelineById(newPipeline.id)
  }

  @Action({ commit: 'setSelectedPipeline', rawError: true })
  public async updateNotification (notification: NotificationConfig): Promise<Pipeline> {
    console.log('update')
    const newPipeline: Pipeline = Object.assign({}, this.selectedPipeline)
    const nIdx = this.selectedPipeline.notifications
      .findIndex(n => n.notificationId === notification.notificationId)
    newPipeline.notifications[nIdx] = notification
    await RestService.updatePipeline(newPipeline)
    return await RestService.getPipelineById(newPipeline.id)
  }

  @Action({ commit: 'setSelectedPipeline', rawError: true })
  public async removeNotification (notification: NotificationConfig): Promise<Pipeline> {
    const newPipeline: Pipeline = Object.assign({}, this.selectedPipeline)
    newPipeline.notifications = this.selectedPipeline.notifications
      .filter(n => n.notificationId !== notification.notificationId)
    await RestService.updatePipeline(newPipeline)
    return await RestService.getPipelineById(newPipeline.id)
  }
}
